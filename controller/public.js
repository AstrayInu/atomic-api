const db = require('../utils/db')

exports.getDompets = (req, res) => {
  try {
    db.execute(db.atomic, `SELECT d.*, ds.status FROM dompet d LEFT JOIN dompet_status ON d.status_id = ds.id`).then(data => {
      res.json(data)
    }).catch(e => {
      console.log("DB ERROR", e)
      res.status(500).json({err: e})
    })
  } catch (e) {
    console.log("ERROR", e)
    res.status(500).json({err: e})
  }
}