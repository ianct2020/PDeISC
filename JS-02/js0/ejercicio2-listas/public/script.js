app.get('personas',(req,res)=>{
    let lista='<h1>listado de personas</h1><ul>';
    Personas.foreach(p=>{
        lista+=<li>$(p.use).$(p.pass)</li>;
    });
    lista+='<ul><a href="/">volver</a>';
    res.send(lista);
})
app.listen(pgat,()=>{
    console.log('server.en:localhost:{port}');
});