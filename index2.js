import { createConnection } from "mysql";
import { createInterface } from "readline";
const rl = createInterface(process.stdin, process.stdout);

function inputText(message) {
    return new Promise((resolve) => {
        rl.question(message, answer => {
            resolve(answer);
        });
    });
}
const conn = createConnection({
    host: 'localhost',
    user: 'prog',
    password: 'Prog123456',
    database: 'adresu_knyga'
});

function query(conn, sql, values) {
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}


// VISAS JUSU KODAS TURI BUTI CIA
/*
spausdinam meniu:
1. zmoniu sarasas
2. adresu sarasas
3. kontaktu sarasas
0. baigti darba
laukiam, kol vartotojas pasirinks 1, 2, 3 arba 0
pasirinkus 1 - programa atspausdina i ekrana varda, pavarde, gimimo data, alga
pasirinkus 2 - programa atspausdina i ekrana varda, pavarde, adresa, miesta, pasto koda
pasirinkus 3 - programa atspausdina i ekrana varda, pavarde, tipa, kontakta
(cia turi matytis visas zmoniu sarasas t.y. turi buti ir zmones, kurie neturi kontaktu)
atlikus 1, 2, 3 - vel spausdina meniu ir vel laukia pasirinkimo
pasirinkus 0 - programa baigia darba
*/

let menuLoop = true;

while (menuLoop) {
    const txt1 = await inputText(`
    -------- MENIU --------
    1. zmoniu sarasas
    2. adresu sarasas
    3. kontaktu sarasas
    0. baigti darba
    `);

    console.log(txt1);

    if (txt1 === '1') {
        let result1 = await query(conn, "select * from zmones");
        console.log(result1);
    }
    if (txt1 === '2') {
        let result2 = await query(conn, `
            select vardas, pavarde, adresas, miestas, pasto_kodas
            from zmones
            join adresai on zmones.id = adresai.zmogus_id
            group by zmones.vardas, zmones.pavarde, adresai.adresas, adresai.miestas, adresai.pasto_kodas`);
        console.log(result2);
    }
    if (txt1 === '3') {
        let result3 = await query(conn, `
            select zmones.vardas, zmones.pavarde, kontaktai.tipas, kontaktai.kontaktas 
            from zmones
            left join kontaktai on kontaktai.zmogus_id = zmones.id`);
        console.log(result3);
    }
    if (txt1 === '0') {
        menuLoop = false;
    }
};

// IKI CIA
conn.end();
rl.close();