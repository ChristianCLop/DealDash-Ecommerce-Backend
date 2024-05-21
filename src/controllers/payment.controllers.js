const { PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API } = require('../config')
const axios = require('axios');
const pool = require('../configDB');

const createOrder = async (req, res) => {
    try {

        const { productId, cantidad } = req.body;  // Asegúrate de obtener el ID del producto de la solicitud

        // Obtén el precio del producto desde tu base de datos o de donde lo tengas almacenado
        const product = await pool.query('SELECT cos_fin_pro FROM "Productos" WHERE id_pro = $1', [productId]);
        const productPrice = product.rows[0].cos_fin_pro;

        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: productPrice * cantidad,
                    },
                },
            ],
            application_context: {
                brand_name: "DealDash.com",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `http://192.168.100.7:3000/capture-order`,
                cancel_url: `http://192.168.100.7:3000/cancel-payment`,
            },
        };

        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        // Generate an access token
        const {
            data: { access_token },
        } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET,
                },
            }
        );

        console.log(access_token);

        // make a request
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        console.log(response.data);

        return res.json(response.data);
    } catch (error) {
        console.error('Error en createOrder:', error);
        return res.status(500).json("Error al procesar el pago con PayPal");
    }
};

const captureOrder = async (req, res) => {
    const { token } = req.query;

    try {
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: PAYPAL_API_CLIENT,
                    password: PAYPAL_API_SECRET,
                },
            }
        );

        console.log(response.data);

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

const cancelPayment = (req, res) => {
    res.status(200).json({ cancel: true });
};

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment,
}