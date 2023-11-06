import mercadopago from 'mercadopago'

export const createPayment = async (req, res) => {
    mercadopago.configure({
        access_token: "TEST-3623486373189896-110601-794d3fa4d0653e0d90ae1d2c54d83929-1538215884"
    });
    
    const result = await mercadopago.preferences.create({
        items: [
            {
                title:'ticket',
                unit_price: 500,
                quantity: 1
            }
        ]
    })
    console.log(result);
    res.send('comprado')
}

export default {createPayment}