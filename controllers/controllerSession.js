//Admin
let admin = false;

export function soloParaAdmin(req,res,next) {
    if(admin){
        next();
    } else{
        res.status(403);
        res.json({ error: -1, description: "No permise route"});
    }
}

export function controllerLoginAdmin(req,res) {
    admin = true;
    res.json({ session: "Login Admin"});
}

export function controllerLogoutAdmin(req,res) {
    admin = false;
    res.json({ session: "Logout Admin"});
}