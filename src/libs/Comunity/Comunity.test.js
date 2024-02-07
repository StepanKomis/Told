const Comunity = require("./Comunity");

async function test(name){
    const com = new Comunity();
    if (!com.exists(name)) {
        console.log('/home');
        return;
    }
    await com.loadComunityData(name);
    const comunityData = com.getComunityData();
    console.log({
    user: req.session.user || {
            isAuthenticated: false
        },
        comunity: comunityData
    });
};

test("Told");
