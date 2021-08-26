const db = require('../utils/db')

exports.getData = (req, res) => {
  try {
    let sql = `SELECT d.*, ds.status AS status FROM ${req.query.type} d LEFT JOIN ${req.query.type}_status ds ON d.status_id = ds.id WHERE 1`
    sql += req.query.q ? ` AND (nama LIKE "%${req.query.q}%" OR referensi LIKE "%${req.query.q}%" OR deskripsi LIKE "%${req.query.q}%")` : ''
    sql += req.query.stats ? ` AND ds.status = ${req.query.stats}` : ''
    
    db.execute(db.atomic, sql).then(data => {
      console.log('data', data)
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

exports.createData = (req, res) => {
  try {
    let { type, data } = req.body
    // console.log(req.body)
    if(type == 'transaksi') {
      let num
      db.execute(db.atomic, `SELECT COUNT(*) as num FROM transaksi_status WHERE status = 1`).then(response => {
        num = response[0].num
      })
    }
    db.execute(db.atomic, `INSERT INTO ${type.toLowerCase()}_status SET ?`, {nama: data.nama, status: data.status}).then(stat => {
      console.log(stat)
      data.status_id = stat.insertId
      delete data.status
      db.execute(db.atomic, `INSERT INTO ${type.toLowerCase()} SET ?`, data).then(response => {
        console.log(response)
        res.json("Berhasil input data")
      })
    })
  } catch (e) {
    console.log("ERROR", e)
    res.status(500).json({err: e})
  }
}

exports.updateData = (req, res) => {
  try {
    db.execute(db.atomic, `UPDATE ${req.body.type} SET ${req.body.data}`).then(result => {
      res.json("Berhasil update dompet")
    })
  } catch (e) {
    console.log("ERROR", e)
    res.status(500).json({err: e})
  }
}

exports.setStatus = (req, res) => {
  try {
    console.log(req.body)
    db.execute(db.atomic, `UPDATE ${req.body.type.toLowerCase()}_status SET status = ${req.body.newStatus} WHERE id = ${req.body.id}`).then(response => {
      console.log(response)
      res.json("Berhasil Update Status!")
    })
  } catch (e) {
    console.log("ERROR", e)
    res.status(500).json({err: e})
  }
}