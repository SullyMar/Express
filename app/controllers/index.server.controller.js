exports.render = function(req, res) {
    if (req.session.lastVisit) { 
        console.log(req.session.lastVisit); 
     }
  req.session.lastVisit = new Date();
  
    res.render('index', { //look in views folder find the index file because we set the views env variables in the express.js file
    title: 'Hello World' //set any title variables text content to this
    })
   };