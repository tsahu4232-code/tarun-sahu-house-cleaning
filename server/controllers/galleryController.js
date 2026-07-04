const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// Upload Image
exports.createImage = async (req, res) => {
  try {
    const { title, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        message: "Title and image are required",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "tarun-cleaning-gallery",
      resource_type: "image",
    });

    const gallery = await Gallery.create({
      title,
      imageUrl: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Gallery
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { title, image } = req.body;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    if (title) {
      gallery.title = title;
    }

    if (image) {
      if (gallery.publicId) {
        await cloudinary.uploader.destroy(gallery.publicId);
      }

      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "tarun-cleaning-gallery",
        resource_type: "image",
      });

      gallery.imageUrl = uploadedImage.secure_url;
      gallery.publicId = uploadedImage.public_id;
    }

    await gallery.save();

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    if (gallery.publicId) {
      await cloudinary.uploader.destroy(gallery.publicId);
    }

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
