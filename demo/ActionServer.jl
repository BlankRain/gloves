Pkg.add("HttpServer")
println("I'm ready.")
using HttpServer
http = HttpHandler() do req::Request, res::Response
    Response( ismatch(r"^/hello/",req.resource) ? string("Hello ", split(req.resource,'/')[3], "!") : 404 )
end

server = Server( http )
run( server, 8000 )
