Post = require('../models/post');
//var arraySort = require('array-sort');

// Handle index actions
exports.index = function (req, res) {
    Post.get(function (err, posts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(posts.reverse());
    });
};
// Handle create post actions
exports.new = function (req, res) {
    var post = new Post();
    post.postImage = req.body.postImage;
    post.postText = req.body.postText;
    post.username = req.body.username;
    post.user=req.body.user;
    post.comments=req.body.comments;
// save the post and check for errors
    post.save(function (err) {
         if (err)
             res.json(err);
             else{
                res.json({
                    message: 'New post created!',
                    data: post
                });
             }
    });
};
// Handle view post info
exports.view = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
        if (err)
            res.send(err);
        res.json({
            message: 'post details loading..',
            data: post
        });
    });
};
// Handle update post info
exports.update = function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
            if (err)
                res.status(400).send(err);
            else {
                post.comments.push(req.body.comments);
                 // save the post and check for errors
                post.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else {
                        res.json({
                        message: 'post Info updated',
                        data: post
                    });
                }
                });
            }    
            
            });
};
// Handle delete post
exports.delete = function (req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function (err, post) {
        if (err)
            res.send(err);
    });
}
