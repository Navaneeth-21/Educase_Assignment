const db = require('../config/db');

const schools = {

    create: (school,cb)=>{
        const sql = 'INSERT INTO schools (Name , address , latitude , longitude) VALUES(?,?,?,?)';
        db.query(sql,[school.Name , school.address , school.latitude , school.longitude] , cb);
    },

    find: (cb)=>{
        const sql = 'SELECT * FROM schools';
        db.query(sql , (err,results)=>{
            if(err){
                console.log('Error retrieving schools:' , err);
                cb(err,null);
            }
            cb(null,results);
        });
    }
};

module.exports = schools;