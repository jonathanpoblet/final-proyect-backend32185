export function controllerRouteNotFound(req,res) {
    res.status(404)
    res.json({ error: -2, description: `route ${req.baseUrl} method ${req.method} not found` })
}