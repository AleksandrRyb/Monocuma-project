const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '04ef73399ff041a4872f67010943eec1'
});


const handlerImageUrl = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json("App is not working"));
}




const handlerImage = (req, res, db) => {
  const { id }  = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
    .catch(err => res.status(400).json("unexprected error"));
}




module.exports = {
  handlerImage: handlerImage,
  handlerImageUrl: handlerImageUrl
}
