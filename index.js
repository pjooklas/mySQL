import { createConnection } from "mysql";

function query(connect, sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

const connection = createConnection({
    host: 'localhost',
    user: 'prog',
    password: 'Prog123456',
    database: 'adresu_knyga'
});

console.log('prisijungem');


let result = await query(connection, `
select vardas, pavarde, 
count(adresai.id) as adresu_kiekis
from zmones
left join adresai on zmones.id = adresai.zmogus_id
group by adresai.zmogus_id, zmones.vardas, zmones.pavarde
order by zmones.vardas, zmones.pavarde`);
console.log(result);

connection.end();