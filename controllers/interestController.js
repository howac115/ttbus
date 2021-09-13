/* Load order model */
var Order = require('../models/order');

/* create one order
 * (POST) 
 * body = {
 *          "customer": "id",
 *          "vendor": "id",
 *          "snacks": [{"snack1": "qty1"}, {"snack2": "qty2"}]
 *        }
 */
exports.orderCreatePost = function (req, res) {
    const order = new Order({
        customer: req.body.customer,
        vendor: req.body.vendor,
        snacks: req.body.snacks,
    });
    order.save((err, postInfo) => {
        if (err) {
            res.status(400).json({ success: false, err });
        } else {
            res.status(200).json({ success: true, postInfo });
        }
    });
};

/* view list of orders of a vendor
 * (GET) http://localhost:5000/order?customer=:customerId&status=outstanding [get all outstanding orders]
 *       http://localhost:5000/order?vendor=:vendorId
 */
exports.orderListGet = function (req, res) {
    Order.find(req.query).populate("vendor").populate("customer").then((orders) => {
        if (orders.length == 0) {
            res.status(404).json({ success: false, errMessage: "no order found" })
        } else {
            res.status(200).json({ success: true, allOrders: orders })
        }
    })
}

/* POST to update one order
 * (POST) 
 * body = {
 *           "snacks": [{"name": "snack1", "qty": "num1"}, {"name": "snack2", "qty": "num2"}],
 *           "status": ["pending" | "cooking" | "fulfilled" | "completed"]
 *         }
 */
exports.orderUpdatePost = function (req, res) {
    Order.findById(req.params.id).then((order) => {
        if (!order) {
            res.status(409).json('order not found in DB');
        } else {
            Order.findByIdAndUpdate(
                req.params.id,
                { snacks: req.body.snacks, status: req.body.status },
                { new: true },
                function (err, updatedOrder) {
                    if (err) {
                        res.status(404).json({ success: false, err });
                    } else {
                        res.status(200).json({ success: true, updatedOrder: updatedOrder });
                    }
                }
            );
        }
    });
};