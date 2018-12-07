var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server on port 8081
// It is important to start Node on a different port
var port = 8081;

var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vehicles');

var Vehicle     = require('./models/vehicles');
var Comment     = require('./models/comments');

var cors = require('cors')

app.use(cors()) 

router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

// GET request to /api returns { message: 'Hello World' }
// In my C9 account the request must be sent to https://node-angular-lgobinath.c9users.io:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});

router.route('/vehicles')

    // create a vehicle (accessed at POST http://localhost:8080/api/vehicles)
    .post(function(req, res) {

        var vehicle = new Vehicle();      // create a new instance of the vehicle model
        vehicle.name = req.body.name;
        vehicle.price = req.body.price;
        vehicle.quantity = req.body.quantity;
        vehicle.tax = req.body.tax;
        vehicle.horsePower = req.body.horsePower;
        vehicle.seats = req.body.seats;
        vehicle.topSpeed = req.body.topSpeed;
        vehicle.image = req.body.image;
        // set the vehicles name (comes from the request)

        // save the vehicle and check for errors
        vehicle.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Vehicle created!' });
        });

    })
    .delete(function(req, res){
        Vehicle.remove({}, function(err, vehicle){
                if(err)
                  res.send(err)
                  
                res.json({message: 'All vehicles removed'})
        });
                
    })
    
        .get(function(req, res) {
        Vehicle.find(function(err, vehicles) {
            if (err)
                res.send(err);

            res.json(vehicles);
        });
    });
router.route('/vehicles/:vehicle_id')

    .get(function(req, res) {
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
            if (err)
                res.send(err);
            res.json(vehicle);
        });
    })

    .delete(function(req, res) {
        Vehicle.remove({
            _id: req.params.vehicle_id
        }, function(err, vehicle) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    })
    
    .put(function(req, res) {

        // use our vehicle model to find the vehicle we want
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {

            if (err)
                res.send(err);
                
                if(req.body.name != null && req.body.name != "")
                vehicle.name = req.body.name;
                if(req.body.price != null && req.body.price != "")
                vehicle.price = req.body.price;
                if(req.body.quantity != null && req.body.quantity != "")
                vehicle.quantity = req.body.quantity;
                if(req.body.tax != null && req.body.tax != "")
                vehicle.tax = req.body.tax;
                if(req.body.horsePower != null && req.body.horsePower != "")
                vehicle.horsePower = req.body.horsePower;
                if(req.body.seats != null && req.body.seats != "")
                vehicle.seats = req.body.seats;
                if(req.body.topSpeed != null && req.body.topSpeed != "")
                vehicle.topSpeed = req.body.topSpeed;
                if(req.body.image != null && req.body.image != "")
                vehicle.image = req.body.image;
                // update the vehicles info

            // save the vehicle
            vehicle.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'vehicle updated!' });
                return;
            });

        });
    });
/*router.route('/update')
.put(function(req,res){
    Vehicle.update({
            _id: req.body._id
        },
        {
            "quantity":req.body.quantity
        }), function(err, vehicle) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully updated' });
        }
})*/
router.route('/comments')
        .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);

            res.json(comments);
        });
    })  
    .post(function(req, res) {

        var comment = new Comment();      // create a new instance of the vehicle model
        comment.item = req.body.item;
        comment.comment = req.body.comment;
        comment.rating = req.body.rating;
        comment.user = req.body.user;
        comment.hidden = false;
     
        // set the vehicles name (comes from the request)

        // save the vehicle and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });

    });
router.route('/comments/:comment_id')    

.put(function(req, res) {

        // use our vehicle model to find the vehicle we want
        Comment.findById(req.params.comment_id, function(err, comment) {

            if (err)
                res.send(err);
                
                if(req.body.item != null)
                comment.item = req.body.item;
                if(req.body.user != null)
                comment.user = req.body.user;
                if(req.body.rating != null)
                comment.rating = req.body.rating;
                if(req.body.comment != null)
                comment.comment = req.body.comment;
                if(req.body.hidden != null)
                comment.hidden = req.body.hidden;
                // update the vehicles info

            // save the vehicle
            comment.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Comment updated!' });
                return;
            });

        });
    });

app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port)