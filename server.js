/* jshint esversion:6 */


var http = require("http");
var fs = require("fs");

var classes = ["P.E.", "Algebra", "English", "History", "Biology", "Spanish"];
var student = [{
				name: "Algebra",
				grade: 89,
				hw: "done"
			}, {
				name: "History",
				grade: 76,
				hw: "not done"
			}, {
				name: "Biology",
				grade: 72,
				hw: "not done"
			}];


var server = http.createServer((req, res) => {
	if (req.url === "/index.html") {
		fs.readFile("index.html", (err, data) => {
			res.write(data);
			res.end();
		});
	} else if (req.url === "/grades") {
		if (req.method === "GET") {
			var a = JSON.stringify(student);
			res.write(a);
			res.end();
		} else if (req.method === "POST") {
			var newClass = "";

            req.on('data', function(data) {
                newClass += data;
                if(newClass.length > 1e6) {
                    newClass = "";
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                student.push({name: newClass, grade: 100, hw: "not done"});
            });
		}
	} else if (req.url === "/schedule") {
		if (req.method === "GET") {
			var b = JSON.stringify(student);
			res.write(b);
			res.end();
		}
	} else if (req.url === "/homework") {
		if (req.method === "GET") {
			var c = JSON.stringify(student);
			res.write(c);
			res.end();
		} else if (req.method === "POST") {
            req.on('data', function(data) {
                for (var i of student) {
                	if (data === i.name) {
                		i.hw = "done";
                	}
                }
                if(newClass.length > 1e6) {
                    res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    req.connection.destroy();
                }
            });

            req.on('end', function() {
                return student;
            });
		}
	} else {
		res.write("UH OH");
		res.end();
	}
});

server.listen(8000, () => {
	console.log("Server started on port 8000");
});