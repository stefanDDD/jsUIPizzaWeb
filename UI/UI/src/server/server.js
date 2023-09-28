const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5501;

const connection = mysql.createConnection({
  host: '89.39.7.10',
  port: 3306,
  user: 'phiobaiqu_root',
  password: 'Andreeas18MySql',
  database: 'phiobaiqu_siemensprojectdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Eroare la conectarea la baza de date:', err);
  } else {
    console.log('Conectat la baza de date MySQL');
  }
});

app.use(express.static(path.join(__dirname, 'src')));

app.use(cors());

app.get('/api/users', (req, res) => {
  const query = 'SELECT user_id, full_name, phone_number, address FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results); 
    }
  });
});

app.get('/api/orderStatus', (req, res) => {
  const query = 'SELECT order_id, user_id, timestamp, status FROM order_status';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/orderItems', (req, res) => {
  const query = 'SELECT order_id, item_id, quantity, item_status FROM order_items';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/menuItems', (req, res) => {
  const query = 'SELECT item_id, product_name, prepare_time, cost FROM menu_items';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Serverul este pornit și ascultă pe portul ${port}`);
});

app.get('/api/orderStatus_custom', (req, res) => {
  const query = "SELECT order_status.order_id, users.full_name, users.address, users.phone_number, users.e_mail ,order_status.status FROM order_status INNER JOIN users ON order_status.user_id = users.user_id WHERE order_status.status != 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/orderItems_custom', (req, res) => {
  const query = "SELECT order_items.order_id, menu_items.product_name, menu_items.prepare_time, menu_items.cost, order_items.quantity, order_items.item_status FROM order_items INNER JOIN menu_items ON order_items.item_id = menu_items.item_id WHERE order_items.item_status != 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/ovens', (req, res) => {
  const query = "SELECT oven_id, oven_status, oven_percentage, oven_items_cooked FROM ovens";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const ovenData = results.map(result => ({
        oven_id: result.oven_id,
        oven_status: result.oven_status,
        oven_percentage: result.oven_percentage,
        oven_items_cooked: result.oven_items_cooked
      }));
      res.json(ovenData);
    }
  });
});

app.get('/api/deliverers', (req, res) => {
  const query = "SELECT deliverer_id, deliverer_status, deliverer_percentage, deliverer_deliveries FROM deliverers";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const delivererData = results.map(result => ({
        deliverer_id: result.deliverer_id,
        deliverer_status: result.deliverer_status,
        deliverer_percentage: result.deliverer_percentage,
        deliverer_deliveries: result.deliverer_deliveries
      }));

      res.json(delivererData);
    }
  });
});

app.get('/api/totalMoneySelector', (req, res) => {
  const query = "SELECT (SELECT SUM(total) FROM order_status WHERE status = 'DELIVERED') - (SELECT SUM(purchase_cost_raw_material) FROM raw_material) AS difference;";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMoneyData = results[0].difference;

      res.json(totalMoneyData);
    }
  });
});


app.get('/api/totalMoneyWeekly', (req, res) => {
  const query = "SELECT SUM(total) as totalSumWeekly, COUNT(order_id) as totalOrdersWeekly FROM order_status WHERE timestamp >= NOW() - INTERVAL 1 WEEK AND timestamp <= NOW() AND status = 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMoneyWeekly = results[0].totalSumWeekly;
      const totalOrdersWeekly = results[0].totalOrdersWeekly;

      const weeklyData = {
        totalMoneyWeekly: totalMoneyWeekly,
        totalOrdersWeekly: totalOrdersWeekly
      };

      res.json(weeklyData);
    }
  });
});

app.get('/api/totalMoneyDaily', (req, res) => {
  const query = "SELECT SUM(total) as totalSumDaily, COUNT(order_id) as totalOrdersDaily FROM order_status WHERE timestamp >= NOW() - INTERVAL 1 DAY AND timestamp <= NOW() AND status = 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMoneyDaily = results[0].totalSumDaily;
      const totalOrdersDaily = results[0].totalOrdersDaily;

      const dailyData = {
        totalMoneyDaily: totalMoneyDaily,
        totalOrdersDaily: totalOrdersDaily
      };

      res.json(dailyData);
    }
  });
});

app.get('/api/totalMoneyMonthly', (req, res) => {
  const query = "SELECT SUM(total) as totalSumMonthly, COUNT(order_id) as totalOrdersMonthly FROM order_status WHERE timestamp >= NOW() - INTERVAL 1 MONTH AND timestamp <= NOW() AND status = 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMoneyMonthly = results[0].totalSumMonthly;
      const totalOrdersMonthly = results[0].totalOrdersMonthly;

      const monthlyData = {
        totalMoneyMonthly: totalMoneyMonthly,
        totalOrdersMonthly: totalOrdersMonthly
      };

      res.json(monthlyData);
    }
  });
});

app.get('/api/totalMoneyYearly', (req, res) => {
  const query = "SELECT SUM(total) as totalSumYearly, COUNT(order_id) as totalOrdersYearly FROM order_status WHERE timestamp >= NOW() - INTERVAL 1 YEAR AND timestamp <= NOW() AND status = 'DELIVERED'";

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMoneyYearly = results[0].totalSumYearly;
      const totalOrdersYearly = results[0].totalOrdersYearly;

      const yearlyData = {
        totalMoneyYearly: totalMoneyYearly,
        totalOrdersYearly: totalOrdersYearly
      };

      res.json(yearlyData);
    }
  });
});

app.get('/api/totalSelledItemsDaily', (req, res) => {
  const query = `SELECT SUM(totalQuantitySold) AS totalSelledItemsDaily
  FROM(
    SELECT
        oi.order_id,
    SUM(oi.quantity) AS totalQuantitySold
    FROM
        order_items AS oi
    INNER JOIN
        order_status AS os ON oi.order_id = os.order_id
    WHERE
        os.timestamp >= NOW() - INTERVAL 1 DAY
        AND os.timestamp <= NOW()
        AND oi.item_status = 'DELIVERED'
    GROUP BY
        oi.order_id
  ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {

      const totalSelledItemsDataDaily = results[0].totalSelledItemsDaily;

      res.json(totalSelledItemsDataDaily);
    }
  });
});

app.get('/api/totalSelledItemsMonthly', (req, res) => {
  const query = `SELECT SUM(totalQuantitySold) AS totalSelledItemsMonthly
  FROM(
    SELECT
        oi.order_id,
    SUM(oi.quantity) AS totalQuantitySold
    FROM
        order_items AS oi
    INNER JOIN
        order_status AS os ON oi.order_id = os.order_id
    WHERE
        os.timestamp >= NOW() - INTERVAL 1 MONTH
        AND os.timestamp <= NOW()
        AND oi.item_status = 'DELIVERED'
    GROUP BY
        oi.order_id
  ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {

      const totalSelledItemsDataMonthly = results[0].totalSelledItemsMonthly;

      res.json(totalSelledItemsDataMonthly);
    }
  });
});

app.get('/api/totalSelledItemsWeekly', (req, res) => {
  const query = `SELECT SUM(totalQuantitySold) AS totalSelledItemsWeekly
  FROM(
    SELECT
        oi.order_id,
    SUM(oi.quantity) AS totalQuantitySold
    FROM
        order_items AS oi
    INNER JOIN
        order_status AS os ON oi.order_id = os.order_id
    WHERE
        os.timestamp >= NOW() - INTERVAL 1 WEEK
        AND os.timestamp <= NOW()
        AND oi.item_status = 'DELIVERED'
    GROUP BY
        oi.order_id
  ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {

      const totalSelledItemsDataWeekly = results[0].totalSelledItemsWeekly;

      res.json(totalSelledItemsDataWeekly);
    }
  });
});

app.get('/api/totalSelledItemsYearly', (req, res) => {
  const query = `SELECT SUM(totalQuantitySold) AS totalSelledItemsYearly
  FROM(
    SELECT
        oi.order_id,
    SUM(oi.quantity) AS totalQuantitySold
    FROM
        order_items AS oi
    INNER JOIN
        order_status AS os ON oi.order_id = os.order_id
    WHERE
        os.timestamp >= NOW() - INTERVAL 1 YEAR
        AND os.timestamp <= NOW()
		AND oi.item_status = 'DELIVERED'
    GROUP BY
        oi.order_id
  ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {

      const totalSelledItemsDataYearly = results[0].totalSelledItemsYearly;

      res.json(totalSelledItemsDataYearly);
    }
  });
});

app.get('/api/rawMaterials', (req, res) => {
  const query = 'SELECT id_raw_material, name_raw_material, cost_raw_material_per_piece, quantity_raw_material, status_raw_material, purchase_cost_raw_material, quantity_purchased_raw_material FROM raw_material';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Eroare la interogarea bazei de date:', err);
      res.status(500).send('Eroare la interogarea bazei de date');
    } else {
      res.json(results);
    }
  });
});
app.use(express.json());

app.post('/api/rawMaterials_batch_update', (req, res) => {
  const updates = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    for (const update of updates) {
      const { rawMaterialId, quantityChange } = update;

      const updateQuery = 'UPDATE raw_material SET quantity_purchased_raw_material = quantity_purchased_raw_material + ?, quantity_raw_material = quantity_raw_material + ? WHERE id_raw_material = ?';
      connection.query(updateQuery, [quantityChange, quantityChange, rawMaterialId], (error, results) => {
        if (error) {
          console.error('Error updating quantity:', error);
          connection.rollback(() => {
            console.error('Transaction rolled back due to error');
            res.status(500).json({ error: 'Internal Server Error' });
          });
        } else {
          console.log(`Quantity for item ${rawMaterialId} updated: ${quantityChange}`);
        }
      });
    }

    const procedureQuery = `
      UPDATE raw_material
      SET status_raw_material =
        CASE
          WHEN quantity_raw_material > 10 THEN "ENOUGH_QUANTITY"
          WHEN quantity_raw_material <= 10 AND quantity_raw_material > 0 THEN "LOW_QUANTITY"
          WHEN quantity_raw_material <= 0 THEN "OUT_OF_QUANTITY"
        END;
    `;

    connection.query(procedureQuery, (error, results) => {
      if (error) {
        console.error('Error calling CalculateRawMaterialStatus:', error);
        connection.rollback(() => {
          console.error('Transaction rolled back due to error');
          res.status(500).json({ error: 'Internal Server Error' });
        });
      } else {
        connection.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'Quantities updated successfully' });
          }
        });
      }
    });
  });
});

app.get('/api/totalPizzasYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPizzasYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 1 AND 18
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPizzasYearly = results[0].totalPizzasYearly;

      res.json(totalPizzasYearly);
    }
  });
});

app.get('/api/totalPizzasMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPizzasMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 1 AND 18
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPizzasMonthly = results[0].totalPizzasMonthly;

      res.json(totalPizzasMonthly);
    }
  });
});


app.get('/api/totalPizzasWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPizzasWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 1 AND 18
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPizzasWeekly = results[0].totalPizzasWeekly;

      res.json(totalPizzasWeekly);
    }
  });
});

app.get('/api/totalPizzasDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPizzasDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 1 AND 18
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPizzasDaily = results[0].totalPizzasDaily;

      res.json(totalPizzasDaily);
    }
  });
});

app.get('/api/totalPorkDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPorkDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 19 AND 22
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPorkDaily = results[0].totalPorkDaily;

      res.json(totalPorkDaily);
    }
  });
});

app.get('/api/totalPorkWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPorkWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 19 AND 22
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPorkWeekly = results[0].totalPorkWeekly;

      res.json(totalPorkWeekly);
    }
  });
});

app.get('/api/totalPorkMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPorkMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 19 AND 22
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPorkMonthly = results[0].totalPorkMonthly;

      res.json(totalPorkMonthly);
    }
  });
});

app.get('/api/totalPorkYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPorkYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 19 AND 22
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPorkYearly = results[0].totalPorkYearly;

      res.json(totalPorkYearly);
    }
  });
});

app.get('/api/totalPastaDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPastaDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 23 AND 26
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPastaDaily = results[0].totalPastaDaily;

      res.json(totalPastaDaily);
    }
  });
});

app.get('/api/totalPastaWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPastaWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 23 AND 26
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPastaWeekly = results[0].totalPastaWeekly;

      res.json(totalPastaWeekly);
    }
  });
});

app.get('/api/totalPastaMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPastaMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 23 AND 26
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPastaMonthly = results[0].totalPastaMonthly;

      res.json(totalPastaMonthly);
    }
  });
});

app.get('/api/totalPastaYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalPastaYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 23 AND 26
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalPastaYearly = results[0].totalPastaYearly;

      res.json(totalPastaYearly);
    }
  });
});

app.get('/api/totalChickenDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalChickenDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 27 AND 30
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalChickenDaily = results[0].totalChickenDaily;

      res.json(totalChickenDaily);
    }
  });
});

app.get('/api/totalChickenWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalChickenWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 27 AND 30
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalChickenWeekly = results[0].totalChickenWeekly;

      res.json(totalChickenWeekly);
    }
  });
});

app.get('/api/totalChickenMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalChickenMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 27 AND 30
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalChickenMonthly = results[0].totalChickenMonthly;

      res.json(totalChickenMonthly);
    }
  });
});

app.get('/api/totalChickenYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalChickenYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 27 AND 30
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalChickenYearly = results[0].totalChickenYearly;

      res.json(totalChickenYearly);
    }
  });
});

app.get('/api/totalFishDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalFishDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 31 AND 34
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalFishDaily = results[0].totalFishDaily;

      res.json(totalFishDaily);
    }
  });
});

app.get('/api/totalFishWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalFishWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 31 AND 34
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalFishWeekly = results[0].totalFishWeekly;

      res.json(totalFishWeekly);
    }
  });
});

app.get('/api/totalFishMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalFishMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 31 AND 34
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalFishMonthly = results[0].totalFishMonthly;

      res.json(totalFishMonthly);
    }
  });
});

app.get('/api/totalFishYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalFishYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 31 AND 34
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalFishYearly = results[0].totalFishYearly;

      res.json(totalFishYearly);
    }
  });
});

app.get('/api/totalDrinksDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDrinksDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 35 AND 38
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDrinksDaily = results[0].totalDrinksDaily;

      res.json(totalDrinksDaily);
    }
  });
});

app.get('/api/totalDrinksWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDrinksWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 35 AND 38
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDrinksWeekly = results[0].totalDrinksWeekly;

      res.json(totalDrinksWeekly);
    }
  });
});

app.get('/api/totalDrinksMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDrinksMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 35 AND 38
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDrinksMonthly = results[0].totalDrinksMonthly;

      res.json(totalDrinksMonthly);
    }
  });
});

app.get('/api/totalDrinksYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDrinksYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 35 AND 38
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDrinksYearly = results[0].totalDrinksYearly;

      res.json(totalDrinksYearly);
    }
  });
});

app.get('/api/totalSauceDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalSauceDaily
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 39 AND 42
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalSauceDaily = results[0].totalSauceDaily;

      res.json(totalSauceDaily);
    }
  });
});

app.get('/api/totalSauceWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalSauceWeekly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 39 AND 42
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalSauceWeekly = results[0].totalSauceWeekly;

      res.json(totalSauceWeekly);
    }
  });
});

app.get('/api/totalSauceMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalSauceMonthly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 39 AND 42
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalSauceMonthly = results[0].totalSauceMonthly;

      res.json(totalSauceMonthly);
    }
  });
});

app.get('/api/totalSauceYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalSauceYearly
      FROM order_status os
      INNER JOIN order_items oi ON os.order_id = oi.order_id
      WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
      AND os.timestamp <= NOW()
      AND oi.item_id BETWEEN 39 AND 42
      AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalSauceYearly = results[0].totalSauceYearly;

      res.json(totalSauceYearly);
    }
  });
});


app.get('/api/totalHomePizzaDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalHomePizzaDaily
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
        AND os.timestamp <= NOW()
        AND oi.item_id = 1
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalHomePizzaDaily = results[0].totalHomePizzaDaily;

      res.json(totalHomePizzaDaily);
    }
  });
});

app.get('/api/totalHomePizzaWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalHomePizzaWeekly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
        AND os.timestamp <= NOW()
        AND oi.item_id = 1
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalHomePizzaWeekly = results[0].totalHomePizzaWeekly;

      res.json(totalHomePizzaWeekly);
    }
  });
});

app.get('/api/totalHomePizzaMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalHomePizzaMonthly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
        AND os.timestamp <= NOW()
        AND oi.item_id = 1
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalHomePizzaMonthly = results[0].totalHomePizzaMonthly;

      res.json(totalHomePizzaMonthly);
    }
  });
});

app.get('/api/totalHomePizzaYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalHomePizzaYearly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
        AND os.timestamp <= NOW()
        AND oi.item_id = 1
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalHomePizzaYearly = results[0].totalHomePizzaYearly;

      res.json(totalHomePizzaYearly);
    }
  });
});

app.get('/api/total4StaggioniDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as total4StaggioniDaily
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
        AND os.timestamp <= NOW()
        AND oi.item_id = 3
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const total4StaggioniDaily = results[0].total4StaggioniDaily;

      res.json(total4StaggioniDaily);
    }
  });
});

app.get('/api/total4StaggioniWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as total4StaggioniWeekly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
        AND os.timestamp <= NOW()
        AND oi.item_id = 3
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const total4StaggioniWeekly = results[0].total4StaggioniWeekly;

      res.json(total4StaggioniWeekly);
    }
  });
});

app.get('/api/total4StaggioniMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as total4StaggioniMonthly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
        AND os.timestamp <= NOW()
        AND oi.item_id = 3
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const total4StaggioniMonthly = results[0].total4StaggioniMonthly;

      res.json(total4StaggioniMonthly);
    }
  });
});

app.get('/api/total4StaggioniYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as total4StaggioniYearly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
        AND os.timestamp <= NOW()
        AND oi.item_id = 3
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const total4StaggioniYearly = results[0].total4StaggioniYearly;

      res.json(total4StaggioniYearly);
    }
  });
});

app.get('/api/totalDiavolaDaily', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDiavolaDaily
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 DAY
        AND os.timestamp <= NOW()
        AND oi.item_id = 15
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDiavolaDaily = results[0].totalDiavolaDaily;

      res.json(totalDiavolaDaily);
    }
  });
});

app.get('/api/totalDiavolaWeekly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDiavolaWeekly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 WEEK
        AND os.timestamp <= NOW()
        AND oi.item_id = 15
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDiavolaWeekly = results[0].totalDiavolaWeekly;

      res.json(totalDiavolaWeekly);
    }
  });
});

app.get('/api/totalDiavolaMonthly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDiavolaMonthly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 MONTH
        AND os.timestamp <= NOW()
        AND oi.item_id = 15
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDiavolaMonthly = results[0].totalDiavolaMonthly;

      res.json(totalDiavolaMonthly);
    }
  });
});

app.get('/api/totalDiavolaYearly', (req, res) => {
  const query = `SELECT SUM(oi.quantity) as totalDiavolaYearly
        FROM order_status os
        INNER JOIN order_items oi ON os.order_id = oi.order_id
        WHERE os.timestamp >= NOW() - INTERVAL 1 YEAR
        AND os.timestamp <= NOW()
        AND oi.item_id = 15
        AND oi.item_status = 'DELIVERED';`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalDiavolaYearly = results[0].totalDiavolaYearly;

      res.json(totalDiavolaYearly);
    }
  });
});

app.get('/api/ordersPizzas', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 1 AND 18 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 1 AND 18
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersPork', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 19 AND 22 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 19 AND 22
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersPasta', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 23 AND 26 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 23 AND 26
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersChicken', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 27 AND 30 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 27 AND 30
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersFish', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 31 AND 34 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 31 AND 34
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersDrink', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 35 AND 38 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 35 AND 38
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersSauce', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 39 AND 42 AND item_status = 'DELIVERED') AS total_quantity
                FROM menu_items AS menuItems
                LEFT OUTER JOIN order_items AS orderItems
                ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                WHERE menuItems.item_id BETWEEN 39 AND 42 
                GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/ordersAll', (req, res) => {
  const query = `SELECT menuItems.product_name, COALESCE(SUM(orderItems.quantity), 0) AS quantity,
                 (SELECT SUM(COALESCE(quantity, 0)) FROM order_items WHERE item_id BETWEEN 1 AND 42 AND item_status = 'DELIVERED') AS total_quantity
                 FROM menu_items AS menuItems
                 LEFT JOIN order_items AS orderItems
                 ON menuItems.item_id = orderItems.item_id AND orderItems.item_status = 'DELIVERED'
                 WHERE menuItems.item_id BETWEEN 1 AND 42 
                 GROUP BY menuItems.product_name;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const productQuantities = results.map(row => ({
        product_name: row.product_name,
        quantity: row.quantity,
        total_quantity: row.total_quantity
      }));

      res.json(productQuantities);
    }
  });
});

app.get('/api/statusPercentage', (req, res) => {
  const query = `SELECT 
                 status,
                 COUNT(*) AS order_number,
                 (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM order_status)) AS percentage
                 FROM 
                 order_status
                 GROUP BY 
                 status;`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const statusPercentages = results.map(row => ({
        status: row.status,
        percentage: row.percentage,
      }));

      res.json(statusPercentages);
    }
  });
});

app.get('/api/graphDisplayedOrders', (req, res) => {
  const query = `SELECT
    DATE_FORMAT(os.timestamp, '%Y-%m-%dT%H:%i:%s') AS order_timestamp,
    oi.quantity AS total
  FROM order_status os
  INNER JOIN order_items oi ON os.order_id = oi.order_id
  WHERE os.timestamp >= CURDATE()
    AND os.timestamp < CURDATE() + INTERVAL 1 DAY
    AND os.timestamp < NOW()
    AND os.status = 'DELIVERED'
  ORDER BY os.timestamp;`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const graphDisplayedOrders = results.map(row => ({
        order_timestamp: row.order_timestamp,
        total: row.total,
      }));

      res.json(graphDisplayedOrders);
    }
  });
});

app.get('/api/graphDisplayedOrdersCanceled', (req, res) => {
  const query = `SELECT
    DATE_FORMAT(os.timestamp, '%Y-%m-%dT%H:%i:%s') AS order_timestamp,
    oi.quantity AS total
  FROM order_status os
  INNER JOIN order_items oi ON os.order_id = oi.order_id
  WHERE os.timestamp >= CURDATE()
    AND os.timestamp < CURDATE() + INTERVAL 1 DAY
    AND os.timestamp < NOW()
    AND os.status = 'CANCELED'
  ORDER BY os.timestamp;`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const graphDisplayedOrders = results.map(row => ({
        order_timestamp: row.order_timestamp,
        total: row.total,
      }));

      res.json(graphDisplayedOrders);
    }
  });
});

app.get('/api/totalOrdersM', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS total_orders_current_month,
                SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS total_orders_previous_month,
                (SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) AS order_difference,
                CASE 
                WHEN SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) / SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) * 100 
                END AS percentage_increase
                FROM (
                SELECT
                MONTH(timestamp) AS month
                FROM order_status
                WHERE (MONTH(timestamp) = MONTH(CURDATE()) OR MONTH(timestamp) = MONTH(CURDATE() - INTERVAL 1 MONTH))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersM = results.map(row => ({
        total_orders_current_month: row.total_orders_current_month,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersM);
    }
  });
});

app.get('/api/totalItemsM', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_items ELSE 0 END) AS total_items_current_month,
                SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_items ELSE 0 END) AS total_items_previous_month,
                (SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_items ELSE 0 END)) AS item_difference,
                CASE 
                WHEN SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_items ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_items ELSE 0 END)) / SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_items ELSE 0 END) * 100 
                END AS percentage_increase
                FROM (
                SELECT
                MONTH(os.timestamp) AS month,
                SUM(oi.quantity) AS total_items
                FROM order_status os
                JOIN order_items oi ON os.order_id = oi.order_id
                WHERE (MONTH(os.timestamp) = MONTH(CURDATE()) OR MONTH(os.timestamp) = MONTH(CURDATE() - INTERVAL 1 MONTH))
                AND os.status = 'DELIVERED'
                AND oi.item_status = 'DELIVERED'
                GROUP BY MONTH(os.timestamp)) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalItemsM = results.map(row => ({
        total_items_current_month: row.total_items_current_month,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalItemsM);
    }
  });
});


app.get('/api/totalIncomeM', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_amount ELSE 0 END) AS total_income_current_month,
                SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_amount ELSE 0 END) AS total_income_previous_month,
                (SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_amount ELSE 0 END)) AS income_difference,
                CASE 
                WHEN SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_amount ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN month = MONTH(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_amount ELSE 0 END)) / SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN total_amount ELSE 0 END) * 100 
                END AS percentage_increase
                FROM(
                SELECT
                MONTH(timestamp) AS month,
                SUM(total) AS total_amount
                FROM order_status
                WHERE(MONTH(timestamp) = MONTH(CURDATE()) OR MONTH(timestamp) = MONTH(CURDATE() - INTERVAL 1 MONTH))
                AND status = 'DELIVERED'
                GROUP BY MONTH(timestamp)
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalIncomeM = results.map(row => ({
        total_income_current_month: row.total_income_current_month,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalIncomeM);
    }
  });
});


app.get('/api/totalCanceledOrdersM', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS total_canceled_current_month,
                SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS total_canceled_previous_month,
                (SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) AS canceledOrder_difference,
                CASE 
                WHEN SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) / SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) * 100 
                END AS percentage_increase
                FROM (
                SELECT
                MONTH(timestamp) AS month
                FROM order_status
                WHERE (MONTH(timestamp) = MONTH(CURDATE()) OR MONTH(timestamp) = MONTH(CURDATE() - INTERVAL 1 MONTH))
                AND status = 'CANCELED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersM = results.map(row => ({
        total_canceled_current_month: row.total_canceled_current_month,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersM);
    }
  });
});


app.get('/api/totalMaterialsM', (req, res) => {
  const query = `SELECT SUM(purchase_cost_raw_material) AS total_purchase_cost
                FROM raw_material;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMaterialsM = results[0].total_purchase_cost;

      res.json(totalMaterialsM);
    }
  });
});

app.get('/api/totalUsersM', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) AS total_users_current_month,
                SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS total_users_previous_month,
                (SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) AS user_difference,
                CASE 
                WHEN SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN month = MONTH(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END)) / SUM(CASE WHEN month = MONTH(CURDATE() - INTERVAL 1 MONTH) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                DISTINCT user_id,
                MONTH(timestamp) AS month
                FROM order_status
                WHERE(MONTH(timestamp) = MONTH(CURDATE()) OR MONTH(timestamp) = MONTH(CURDATE() - INTERVAL 1 MONTH))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalUsersM = results.map(row => ({
        total_users_current_month: row.total_users_current_month,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalUsersM);
    }
  });
});

app.get('/api/totalOrdersD', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) AS total_orders_current_day,
                SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS total_orders_previous_day,
                (SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) AS order_difference,
                CASE 
                WHEN SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) / SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) * 100 
                END AS percentage_increase
                FROM (
                SELECT
                DAY(timestamp) AS day
                FROM order_status
                WHERE (DAY(timestamp) = DAY(CURDATE()) OR DAY(timestamp) = DAY(CURDATE() - INTERVAL 1 DAY))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersD = results.map(row => ({
        total_orders_current_day: row.total_orders_current_day,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersD);
    }
  });
});

app.get('/api/totalItemsD', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN day = DAY(CURDATE()) THEN total_items ELSE 0 END) AS total_items_current_day,
                SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_items ELSE 0 END) AS total_items_previous_day,
                (SUM(CASE WHEN day = DAY(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_items ELSE 0 END)) AS item_difference,
                CASE 
                WHEN SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_items ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN day = DAY(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_items ELSE 0 END)) / SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_items ELSE 0 END) * 100 
                END AS percentage_increase
                FROM (
                SELECT
                DAY(os.timestamp) AS day,
                SUM(oi.quantity) AS total_items
                FROM order_status os
                JOIN order_items oi ON os.order_id = oi.order_id
                WHERE (DAY(os.timestamp) = DAY(CURDATE()) OR DAY(os.timestamp) = DAY(CURDATE() - INTERVAL 1 DAY))
                AND os.status = 'DELIVERED'
                AND oi.item_status = 'DELIVERED'
                GROUP BY DAY(os.timestamp)) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalItemsD = results.map(row => ({
        total_items_current_day: row.total_items_current_day,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalItemsD);
    }
  });
});


app.get('/api/totalIncomeD', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN day = DAY(CURDATE()) THEN total_amount ELSE 0 END) AS total_income_current_day,
                SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_amount ELSE 0 END) AS total_income_previous_day,
                (SUM(CASE WHEN day = DAY(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_amount ELSE 0 END)) AS income_difference,
                CASE 
                WHEN SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_amount ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN day = DAY(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_amount ELSE 0 END)) / SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN total_amount ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                DAY(timestamp) AS day,
                SUM(total) AS total_amount
                FROM order_status
                WHERE(DAY(timestamp) = DAY(CURDATE()) OR DAY(timestamp) = DAY(CURDATE() - INTERVAL 1 DAY))
                AND status = 'DELIVERED'
                GROUP BY DAY(timestamp)
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalIncomeD = results.map(row => ({
        total_income_current_day: row.total_income_current_day,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalIncomeD);
    }
  });
});


app.get('/api/totalCanceledOrdersD', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) AS total_canceled_current_day,
                SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS total_canceled_previous_day,
                (SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) AS canceledOrder_difference,
                CASE 
                WHEN SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) / SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                DAY(timestamp) AS day
                FROM order_status
                WHERE (DAY(timestamp) = DAY(CURDATE()) OR DAY(timestamp) = DAY(CURDATE() - INTERVAL 1 DAY))
                AND status = 'CANCELED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersD = results.map(row => ({
        total_canceled_current_day: row.total_canceled_current_day,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersD);
    }
  });
});


app.get('/api/totalMaterialsD', (req, res) => {
  const query = `SELECT SUM(purchase_cost_raw_material) AS total_purchase_cost
                FROM raw_material;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMaterialsD = results[0].total_purchase_cost;

      res.json(totalMaterialsD);
    }
  });
});

app.get('/api/totalUsersD', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) AS total_users_current_day,
                SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS total_users_previous_day,
                (SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) AS user_difference,
                CASE 
                WHEN SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN day = DAY(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END)) / SUM(CASE WHEN day = DAY(CURDATE() - INTERVAL 1 DAY) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                DISTINCT user_id,
                DAY(timestamp) AS day
                FROM order_status
                WHERE(DAY(timestamp) = DAY(CURDATE()) OR DAY(timestamp) = DAY(CURDATE() - INTERVAL 1 DAY))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalUsersD = results.map(row => ({
        total_users_current_day: row.total_users_current_day,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalUsersD);
    }
  });
});

app.get('/api/totalOrdersW', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS total_orders_current_week,
                SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) AS total_orders_previous_week,
                (SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) AS order_difference,
                CASE 
                WHEN SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) / SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                WEEK(timestamp) AS week
                FROM order_status
                WHERE (WEEK(timestamp) = WEEK(CURDATE()) OR WEEK(timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersW = results.map(row => ({
        total_orders_current_week: row.total_orders_current_week,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersW);
    }
  });
});

app.get('/api/totalItemsW', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_items ELSE 0 END) AS total_items_current_week,
                SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_items ELSE 0 END) AS total_items_previous_week,
                (SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_items ELSE 0 END)) AS item_difference,
                CASE 
                WHEN SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_items ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_items ELSE 0 END)) / SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_items ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                WEEK(os.timestamp) AS week,
                SUM(oi.quantity) AS total_items
                FROM order_status os
                JOIN order_items oi ON os.order_id = oi.order_id
                WHERE (WEEK(os.timestamp) = WEEK(CURDATE()) OR WEEK(os.timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK))
                AND os.status = 'DELIVERED'
                AND oi.item_status = 'DELIVERED'
                GROUP BY WEEK(os.timestamp)) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalItemsW = results.map(row => ({
        total_items_current_week: row.total_items_current_week,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalItemsW);
    }
  });
});


app.get('/api/totalIncomeW', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_amount ELSE 0 END) AS total_income_current_week,
                SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_amount ELSE 0 END) AS total_income_previous_week,
                (SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_amount ELSE 0 END)) AS income_difference,
                CASE 
                WHEN SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_amount ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN week = WEEK(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_amount ELSE 0 END)) / SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN total_amount ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                WEEK(timestamp) AS week,
                SUM(total) AS total_amount
                FROM order_status
                WHERE(WEEK(timestamp) = WEEK(CURDATE()) OR WEEK(timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK))
                AND status = 'DELIVERED'
                GROUP BY WEEK(timestamp)
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalIncomeW = results.map(row => ({
        total_income_current_week: row.total_income_current_week,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalIncomeW);
    }
  });
});


app.get('/api/totalCanceledOrdersW', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS total_canceled_current_week,
                SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) AS total_canceled_previous_week,
                (SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) AS canceledOrder_difference,
                CASE 
                WHEN SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) / SUM(CASE WHEN WEEK = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                WEEK(timestamp) AS week
                FROM order_status
                WHERE (WEEK(timestamp) = WEEK(CURDATE()) OR WEEK(timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK))
                AND status = 'CANCELED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersW = results.map(row => ({
        total_canceled_current_week: row.total_canceled_current_week,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersW);
    }
  });
});


app.get('/api/totalMaterialsW', (req, res) => {
  const query = `SELECT SUM(purchase_cost_raw_material) AS total_purchase_cost
                FROM raw_material;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMaterialsW = results[0].total_purchase_cost;

      res.json(totalMaterialsW);
    }
  });
});

app.get('/api/totalUsersW', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) AS total_users_current_week,
                SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) AS total_users_previous_week,
                (SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) AS user_difference,
                CASE 
                WHEN SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN week = WEEK(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END)) / SUM(CASE WHEN week = WEEK(CURDATE() - INTERVAL 1 WEEK) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                DISTINCT user_id,
                WEEK(timestamp) AS week
                FROM order_status
                WHERE(WEEK(timestamp) = WEEK(CURDATE()) OR WEEK(timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalUsersW = results.map(row => ({
        total_users_current_week: row.total_users_current_week,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalUsersW);
    }
  });
});

app.get('/api/totalOrdersY', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS total_orders_current_year,
                SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) AS total_orders_previous_year,
                (SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) AS order_difference,
                CASE 
                WHEN SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) / SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                YEAR(timestamp) AS year
                FROM order_status
                WHERE (YEAR(timestamp) = YEAR(CURDATE()) OR YEAR(timestamp) = YEAR(CURDATE() - INTERVAL 1 YEAR))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersY = results.map(row => ({
        total_orders_current_year: row.total_orders_current_year,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersY);
    }
  });
});

app.get('/api/totalItemsY', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_items ELSE 0 END) AS total_items_current_year,
                SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_items ELSE 0 END) AS total_items_previous_year,
                (SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_items ELSE 0 END)) AS item_difference,
                CASE 
                WHEN SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_items ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_items ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_items ELSE 0 END)) / SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_items ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                YEAR(os.timestamp) AS year,
                SUM(oi.quantity) AS total_items
                FROM order_status os
                JOIN order_items oi ON os.order_id = oi.order_id
                WHERE (YEAR(os.timestamp) = YEAR(CURDATE()) OR YEAR(os.timestamp) = YEAR(CURDATE() - INTERVAL 1 YEAR))
                AND os.status = 'DELIVERED'
                AND oi.item_status = 'DELIVERED'
                GROUP BY DAY(os.timestamp)) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalItemsY = results.map(row => ({
        total_items_current_year: row.total_items_current_year,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalItemsY);
    }
  });
});

app.get('/api/totalIncomeY', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_amount ELSE 0 END) AS total_income_current_year,
                SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_amount ELSE 0 END) AS total_income_current_year,
                (SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_amount ELSE 0 END)) AS income_difference,
                CASE 
                WHEN SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_amount ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN year = YEAR(CURDATE()) THEN total_amount ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_amount ELSE 0 END)) / SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN total_amount ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                YEAR(timestamp) AS year,
                SUM(total) AS total_amount
                FROM order_status
                WHERE(YEAR(timestamp) = YEAR(CURDATE()) OR YEAR(timestamp) = YEAR(CURDATE() - INTERVAL 1 YEAR))
                AND status = 'DELIVERED'
                GROUP BY YEAR(timestamp)
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalIncomeY = results.map(row => ({
        total_income_current_year: row.total_income_current_year,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalIncomeY);
    }
  });
});


app.get('/api/totalCanceledOrdersY', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS total_canceled_current_year,
                SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) AS total_canceled_previous_year,
                (SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) AS canceledOrder_difference,
                CASE 
                WHEN SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE (SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) / SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM (
                SELECT
                YEAR(timestamp) AS year
                FROM order_status
                WHERE (YEAR(timestamp) = YEAR(CURDATE()) OR YEAR(timestamp) = YEAR(CURDATE() - INTERVAL 1 YEAR))
                AND status = 'CANCELED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalOrdersY = results.map(row => ({
        total_canceled_current_year: row.total_canceled_current_year,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalOrdersY);
    }
  });
});


app.get('/api/totalMaterialsY', (req, res) => {
  const query = `SELECT SUM(purchase_cost_raw_material) AS total_purchase_cost
                FROM raw_material;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalMaterialsY = results[0].total_purchase_cost;

      res.json(totalMaterialsY);
    }
  });
});

app.get('/api/totalUsersY', (req, res) => {
  const query = `SELECT
                SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS total_users_current_year,
                SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) AS total_users_current_year,
                (SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) AS user_difference,
                CASE 
                WHEN SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) = 0 THEN NULL
                ELSE(SUM(CASE WHEN year = YEAR(CURDATE()) THEN 1 ELSE 0 END) - SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END)) / SUM(CASE WHEN year = YEAR(CURDATE() - INTERVAL 1 YEAR) THEN 1 ELSE 0 END) * 100
                END AS percentage_increase
                FROM(
                SELECT
                DISTINCT user_id,
                YEAR(timestamp) AS year
                FROM order_status
                WHERE(YEAR(timestamp) = YEAR(CURDATE()) OR YEAR(timestamp) = YEAR(CURDATE() - INTERVAL 1 YEAR))
                AND status = 'DELIVERED'
                ) AS subquery;`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
    } else {
      const totalUsersY = results.map(row => ({
        total_users_current_year: row.total_users_current_year,
        percentage_increase: row.percentage_increase,
      }));

      res.json(totalUsersY);
    }
  });
});

