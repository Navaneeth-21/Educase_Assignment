const db = require('../config/db');

const schools = {

    create: (school,cb)=>{
        const sql = 'INSERT INTO schools (Name , address , latitude , longitude) VALUES(?,?,?,?)';
        db.query(sql,[school.Name , school.address , school.latitude , school.longitude] , (err,result)=>{
            if(err){
                console.error('Error adding school:', err);
                return cb(err, null); // Early return on error
            }
            cb(null, result);
        });
    },

    find: (cb)=>{
        const sql = 'SELECT * FROM schools';
        db.query(sql , (err,results)=>{
            if(err){
                console.log('Error retrieving schools:' , err);
                return cb(err,null);
            }
            cb(null,results);
        });
    }
};

module.exports = schools;