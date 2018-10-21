import SqlString from 'sqlstring';
import connection from '../config/db';

export function listAllInternships(req, res) {
  const sql = SqlString.format('SELECT * FROM internships WHERE is_active=?', [
    true,
  ]);
  connection.execute(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    res.send(rows);
  });
}

export function createInternship(req, res) {
  const jsonData = req.body;
  const sql = SqlString.format(`INSERT INTO internships SET ?`, jsonData);

  connection.execute(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.send('success');
  });
}

export function getInternshipById(req, res) {
  const internshipId = req.params.id;
  const sql = SqlString.format(
    'SELECT * FROM internships WHERE id = ? AND is_active = ?',
    [internshipId, true],
  );

  connection.execute(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length === 0) {
      res.status(404).send('Not Found');
      return;
    }

    res.send(rows[0]);
  });
}

export function updateInternship(req, res) {
  const internshipId = req.params.id;
  const jsonData = req.body;

  const sql = SqlString.format(`UPDATE internships SET ? WHERE id = ?`, [
    jsonData,
    internshipId,
  ]);

  connection.execute(sql, (err, result) => {
    if (err) {
      throw err;
    }

    if (!result.affectedRows) {
      res.status(404).send('Not Found');
      return;
    }

    res.send('success');
  });
}

export function deleteInternship(req, res) {
  const internshipId = req.params.id;
  const sql = SqlString.format(`UPDATE internships SET ? WHERE id = ?`, [
    {
      is_active: false,
    },
    internshipId,
  ]);

  connection.execute(sql, (err, result) => {
    if (err) {
      throw err;
    }

    if (!result.affectedRows) {
      res.status(404).send('Not Found');
      return;
    }

    res.send('success');
  });
}
