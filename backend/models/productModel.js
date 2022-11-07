import mongoose from 'mongoose'


const productSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      carouselImage: {
        type: String,
        required: false,
      },
      category: {
        type: String,
        required: true,
      },
      artist: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
      recommend: {
        type: Number,
        required: false,
      },
      isPublished: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
  
  const Product = mongoose.model('Product', productSchema)
  
  export default Product