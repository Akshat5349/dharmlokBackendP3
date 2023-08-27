const audioModel = require('../models/audioModel');
const audioCategoryoModel = require('../models/audioCategory');
const audioPlaylistModel = require('../models/audioPlaylistModel');
const jwt = require("jsonwebtoken");


module.exports = {
    addAudio : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let audio = new audioModel({
                        userId : user.id,
                        title : req.body.title,
                        description : req.body.description,
                        category : req.body.category,
                        playlist : req.body.playlist,
                        bannerImageUrl : req.body.bannerImageUrl,
                        audioUrl : req.body.audioUrl,
                    })
                    audio.save(function (eor){
                        if(eor) res.status(200).json({success : false,message: 'Something went wrong '+eor.message})
                        else res.status(200).json({success : true,message: audio})
                    });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllAudio : async function(req, res) {
        try{
            const audio =  await audioModel.find({}).sort([['_id', -1]]);
            res.status(200).json({success : true,message: audio})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    getAudioById : async function(req, res) {
        try{
            const audio =  await audioModel.findOne({_id : req.body.id});
            res.status(200).json({success : true,message: audio})
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    deleteAudio : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                audioModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                    if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                    else res.status(200).json({success : true, message: 'Audio Deleted'})
                });
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAudio : function(req, res){
        let audio;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    audio =  await audioModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            title : req.body.title,
                            description : req.body.description,
                            category : req.body.category,
                            playlist : req.body.playlist,
                            bannerImageUrl : req.bodybannerImageUrl,
                            audioUrl : req.body.audioUrl
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: audio})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    addAudioCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let audioCat = new audioCategoryoModel({
                        userId : user.id,
                        name : req.body.name,
                        imageUrl : req.body.imageUrl
                    })
                    audioCat.save(
                        function(eor){
                            if(eor) res.status(400).json({success : false,message: 'Something went wrong '+ eor.message})
                            if(eor && err.code === 11000) res.status(400).json({success : false,message: 'Category already exists'})
                            else res.status(200).json({success : true,message: audioCat})
                        });
                    
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllCategories : async function(req, res){
        var audioCat = await audioCategoryoModel.find({}).sort([['_id', 'asc']]).lean();
        if(audioCat.length > 0){
            for(var i = 0 ; i < audioCat.length ; i++){
                var playlist = await audioPlaylistModel.find({category : audioCat[i].name}).sort([['_id', 'desc']]);
                audioCat[i].playlist = playlist;
            }
        }
        res.status(200).json({success : true,message: audioCat})
    },
    deleteCategory : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                var categoryName = await audioCategoryoModel.findOne({_id : req.body.id }).select('name');
                if(categoryName != null){
                    var audio = await audioModel.find({category : categoryName.name });
                    if(audio != null){
                        res.status(400).json({success : false, message: 'Audio available in this category. Please delete audio before deleting category'})
                    }
                    else{
                        audioCategoryoModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                            if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                            else res.status(200).json({success : true, message: 'Category Deleted'})
                        });
                    }
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAudioCategory : function(req, res){
        let audio;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    audio =  await audioCategoryoModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                            imageUrl : req.body.imageUrl
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: audio})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
    addAudioPlaylist : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    let audioPlaylist = new audioPlaylistModel({
                        userId : user.id,
                        name : req.body.name,
                        imageUrl : req.body.imageUrl,
                        category : req.body.category
                    })
                    audioPlaylist.save(
                        function(eor){
                            if(eor) res.status(200).json({success : false,message: 'Something went wrong '+ eor.message})
                            else res.status(200).json({success : true,message: audioPlaylist})
                        });
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    getAllPlaylist : async function(req, res){
        var audioPlayList = await audioPlaylistModel.find({}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: audioPlayList})
    },
    getAllPlaylistById : async function(req, res){
        var audioPlayList = await audioPlaylistModel.find({_id : req.body.id}).sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: audioPlayList})
    },
    getPlaylistFromCategory : async function(req, res){
        var audioPlayList = await audioModel.find({category : req.body.category}).select('playlist').sort([['_id', 'desc']]);
        res.status(200).json({success : true,message: audioPlayList})
    },
    deletePlaylist : function(req, res){
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});

                var playlistName = await audioPlaylistModel.findOne({_id : req.body.id }).select('name');
                if(playlistName != null){
                    var audio = await audioModel.find({playlist : playlistName.name });
                    if(audio != null){
                        res.status(400).json({success : false, message: 'Audio available in this Playlist. Please delete audio before deleting playlist'})
                    }
                    else{
                        audioPlaylistModel.findByIdAndDelete({_id : req.body.id } , function(errorDelete, response){
                            if (errorDelete) res.status(400).json({success : false,message: errorDelete.message});
                            else res.status(200).json({success : true, message: 'Playlist Deleted'})
                        });
                    }
                }                
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        }
    },
    updateAudioPlayList : function(req, res){
        let audio;
        try{
            jwt.verify(req.headers.token, 'bootspider', async function(err, user){
                if (err) res.status(400).json({success : false,message: err.message});
                else{
                    audio =  await audioPlaylistModel.findOneAndUpdate({_id : req.body.id}, 
                        {
                            name : req.body.name,
                            imageUrl : req.body.imageUrl,
                            category : req.body.category
                        },{
                        new: true
                    });
                    res.status(200).json({success : true, message: audio})
                }
            });
            }
        catch (error) {
            res.status(400).json({success : false,message: error.message})
        } 
    },
}