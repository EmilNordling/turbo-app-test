use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use serde::{Serialize,Deserialize};
use std::io;

#[derive(Serialize)]
struct MyObj {
	name: String,
}

#[get("/")]
async fn index() -> impl Responder {
	HttpResponse::Ok().body("")
}

#[get("/logs/{id}")]
async fn logs(id: web::Path<String>) -> Result<impl Responder> {
	let obj = MyObj {
		name: id.to_string(),
	};
	Ok(web::Json(obj))
}

#[derive(Deserialize)]
struct Info {
    username: String,
}

#[post("/log")]
async fn log(info: web::Json<Info>) -> Result<String> {
	Ok(format!("Welcome {}!", info.username))
}

#[actix_web::main]
async fn main() -> io::Result<()> {
	HttpServer::new(|| App::new().service(index).service(log).service(logs))
		.bind(("127.0.0.1", 8080))?
		.run()
		.await
}
