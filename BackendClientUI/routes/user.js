const express = require('express');
const connection = require('../connection');
const crypto = require('crypto');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
require('dotenv').config();

var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');
const { env } = require('process');

router.post('/addneworder', (req, res) => {
    let userId = req.body.user_id;
    let gtotal = req.body.total;
    const insertNewOrder = 'INSERT INTO order_status(user_id, total) VALUES (?, ?)';
    connection.query(insertNewOrder, [userId, gtotal], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }
        else {
            return res.status(200).json({ message: 'Order added' });
        }
    });
});

router.post('/sendcart', (req, res) => {
    const user_id = req.body.user_id;
    const itemId = req.body.item_id;
    const quantity = req.body.quantity;

    orderId = 0;
    getOrderIdQuery = 'SELECT order_id FROM order_status WHERE user_id = ? AND status = "PENDING" ORDER BY order_id DESC';
    connection.query(getOrderIdQuery, [user_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }
        if (results.length > 0) {
            orderId = results[0].order_id;
            console.log(orderId);

            const insertItemQuery = 'INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)';
            connection.query(insertItemQuery, [orderId, itemId, quantity], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Server Error' });
                }
                console.log(`Item ${itemId} added to order ${orderId}, quantity = ${quantity}.`);
            });

            return res.status(200).json({ message: 'Order added' });
        }
    });
});

router.post('/signup', (req, res) => {
    const user = req.body;
    const salt = generateSalt();
    const password = generateHash(user.password, salt);

    const checkEmailQuery = 'SELECT e_mail FROM users WHERE e_mail = ?';
    const insertUserQuery = 'INSERT INTO users (username, full_name, e_mail, phone_number, address, password, salt, status, role) VALUES (?,?,?,?,?,?,?,0,"user")';

    connection.query(checkEmailQuery, [user.email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        connection.query(
            insertUserQuery,
            [user.username, user.full_name, user.email, user.phone_number, user.address, password, salt],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Server Error' });
                }
                console.log("User added.");
                return res.status(200).json({ message: 'Successfully Registered' });
            }
        );
    });
});

router.post('/login', (req, res) => {
    const user = req.body;
    checkUserQuery = "SELECT user_id, full_name, username, address, e_mail, password, phone_number, role, status, salt FROM users where username = ?";
    connection.query(checkUserQuery, [user.username], (err, results) => {
        if (!err) {
            if (results.length <= 0 || authhash(results[0].password, results[0].salt, user.password) == 0) {
                return res.status(401).json({ message: "Incorrect username or Password." });
            }
            else if (results[0].status == 0) {
                return res.status(401).json({ message: "Wait for admin approval." });
            }
            else if (authhash(results[0].password, results[0].salt, user.password) == 1) {
                console.log("User " + user.username + " has connected.");
                const response = { user_id: results[0].user_id, e_mail: results[0].e_mail, role: results[0].role, username: results[0].username, address: results[0].address, phone_number: results[0].phone_number, full_name: results[0].full_name }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '31d' });
                return res.status(200).json({ token: accessToken });
            }
        }
    });
});

router.get('/get', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    var query = "SELECT user_id, username, full_name, phone_number,e_mail, address FROM users WHERE role = 'user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
});

router.patch('/update', auth.authenticateToken, (req, res) => {
    let user = req.body;
    var query = "UPDATE users SET status = ? WHERE user_id = ?";
    connection.query(query, [user.status, user.user_id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User id dont exist" });
            }
            return res.status(200).json({ message: "User updated succesfully" });
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.get('/checkToken', auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: "True" });
});

router.post('/verifyToken', (req, res) => {
    const token = req.body.token;

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            console.log('Tokenul este invalid:', err);
            return res.status(401).json({ message: "Error" });
        }
        else {
            console.log('Tokenul este valid');
            console.log('Decodificarea tokenului:', decoded);
            return res.status(200).json({ message: "True" });
        }
    });
});

router.post('/changePassword', auth.authenticateToken, (req, res) => {
    const user = req.body;
    const email = res.locals.e_mail;
    var query = "SELECT * FROM users WHERE e_mail = ? and password = ?";
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect old password" });
            }
            else if (results[0].password == user.oldPassword) {
                query = "UPDATE users SET password = ? WHERE e_mail = ?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password updated succesfully" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                });
            }
            else {
                return res.status(400).json({ message: "Please try again later" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/orderinfo/:orderid', (req, res) => {
    const order = req.params.orderid;

    const getUserInfoQuery = "SELECT users.user_id, users.username, users.full_name,users.address, users.phone_number,users.arrivalTime, order_status.status,order_status.timestamp, order_status.total FROM order_status INNER JOIN users ON order_status.user_id = users.user_id WHERE order_status.order_id = ?";

    connection.query(getUserInfoQuery, [order], (err, userResults) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (userResults === null || userResults.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }


        const getUserItemsQuery = "SELECT order_items.item_id, order_items.quantity, menu_items.product_name, menu_items.prepare_time, menu_items.cost from order_items inner join menu_items on order_items.item_id = menu_items.item_id where order_id = ?";
        connection.query(getUserItemsQuery, [order], (err, itemsResuls) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (userResults === null || userResults.length === 0) {
                return res.status(404).json({ message: "Order not found" });
            }

            const userData = userResults.map(user => ({
                user_id: user.user_id,
                username: user.username,
                full_name: user.full_name,
                address: user.address,
                phone_number: user.phone_number,
                status: user.status,
                timestamp: user.timestamp,
                total: user.total,
                arrivalTime: user.arrivalTime,
                items: []
            }));

            const itemsData = itemsResuls.map(item => ({
                itemId: item.item_id,
                itemName: item.product_name,
                quantity: item.quantity,
                itemCost: item.cost,
                quantityCost: item.cost * item.quantity,
                itemInfo: `${item.quantity}x ${item.product_name} | Cost ${item.cost * item.quantity} Ron`

            }))

            userData[0].items = itemsData;

            return res.status(200).json(userData);
        })
    });
});


router.get('/orderStatus/:username', (req, res) => {
    const username = req.params.username;
    const order = req.query.order;

    const getUserQuery = "SELECT user_id, address FROM users WHERE username = ?";
    connection.query(getUserQuery, [username], (err, userResults) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (userResults === null || userResults.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user_id = userResults[0].user_id;

        let getOrderQuery = "SELECT user_id, order_id, timestamp, status, total FROM order_status WHERE user_id = ?";
        if (order === 'status') {
            getOrderQuery += " AND status NOT IN ('DELIVERED');";
        } else {
            getOrderQuery += " ORDER BY order_id DESC";
        }

        getOrderQuery += " LIMIT 5";

        connection.query(getOrderQuery, [user_id], (err, orderResults) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (orderResults === null || orderResults.length === 0) {
                return res.status(404).json({ message: "No orders found." });
            }

            const address = userResults[0].address;

            const ordersNew = orderResults.map(order => ({
                user_id: order.user_id,
                order_id: order.order_id,
                timestamp: order.timestamp,
                status: order.status,
                address: address,
                total: order.total
            }));

            return res.status(200).json(ordersNew);
        });
    });
});

function genHash(password, salt) {
    const hash = crypto.createHash('sha256');
    hash.update(salt + password);
    return hash.digest('hex');
}

function genSalt() {
    return crypto.randomBytes(16).toString('hex');
}

function authhash(passwordDB, saltDB, passwordLocal) {

    const hashLocal = genHash(passwordLocal, saltDB);
    if (hashLocal === passwordDB) {
        console.log('Auth ok.');
        return 1;
    }
    return 0;
}


module.exports = router;
