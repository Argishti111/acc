const express = require("express");
const router = express();
const pool = require("../config/connectionDB");

router.post("/", async (req,res)=> {
    let {companyId,ssn} = req.body;

    try{
        const result = await pool.query(`SELECT * FROM get_employees(${companyId},${ssn}::varchar)`);
        res.send(result);
    }
    catch (e){
        console.log(e);
        res.send("fail");
    }

});

router.post("/add", async (req,res) => {
    let {id,first_name, last_name, ssn, passport, address, hire_date, fire_date, working_hours} = req.body;

    id = isNaN(id) || id === "" ? 0 : parseInt(id);
    fire_date = fire_date === "" ? null : "'" + fire_date + "'";
    try{
        const resultEmp = await pool.query(
            `SELECT * FROM add_or_edit_employee(${id},'${first_name}','${last_name}','${ssn}'::varchar,'${passport}','${address}')`
        );

        id = resultEmp.rows[0].employee_id;

        const resultCompEmp = await pool.query(
            `SELECT * FROM add_or_edit_employee_to_company(${id},${1},'${hire_date}',${fire_date},${working_hours}::smallint)`
        );
        res.send("success");
    }
    catch (e) {
        console.log(e);
        res.send("fail");
    }

})

module.exports = router;