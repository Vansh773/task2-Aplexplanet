"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Search, Grid, List, Heart, Eye } from "lucide-react"

interface GalleryImage {
  id: number
  url: string
  title: string
  description: string
  category: string
  likes: number
  addedAt: Date
}

type ViewMode = "grid" | "list"
type SortType = "date" | "title" | "likes"

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Form state
  const [newImage, setNewImage] = useState({
    url: "",
    title: "",
    description: "",
    category: "nature",
  })

  // Sample images for demonstration
  const sampleImages: GalleryImage[] = [
    {
      id: 1,
      url: "/placeholder.svg?height=300&width=400",
      title: "Mountain Landscape",
      description: "Beautiful mountain view during sunset",
      category: "nature",
      likes: 15,
      addedAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      url: "/placeholder.svg?height=300&width=400",
      title: "City Architecture",
      description: "Modern building with glass facade",
      category: "architecture",
      likes: 8,
      addedAt: new Date("2024-01-20"),
    },
    {
      id: 3,
      url: "/placeholder.svg?height=300&width=400",
      title: "Abstract Art",
      description: "Colorful abstract composition",
      category: "art",
      likes: 23,
      addedAt: new Date("2024-01-25"),
    },
    {
      id: 4,
      url: "/placeholder.svg?height=300&width=400",
      title: "Ocean Waves",
      description: "Peaceful ocean scene with waves",
      category: "nature",
      likes: 12,
      addedAt: new Date("2024-02-01"),
    },
    {
      id: 5,
      url: "/placeholder.svg?height=300&width=400",
      title: "Street Photography",
      description: "Urban life captured in black and white",
      category: "photography",
      likes: 19,
      addedAt: new Date("2024-02-05"),
    },
    {
      id: 6,
      url: "/placeholder.svg?height=300&width=400",
      title: "Digital Design",
      description: "Modern UI/UX design concept",
      category: "design",
      likes: 31,
      addedAt: new Date("2024-02-10"),
    },
  ]

  // Load images from localStorage or use sample data
  useEffect(() => {
    const savedImages = localStorage.getItem("galleryImages")
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages).map((img: any) => ({
        ...img,
        addedAt: new Date(img.addedAt),
      }))
      setImages(parsedImages)
    } else {
      setImages(sampleImages)
    }
  }, [])

  // Save images to localStorage
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem("galleryImages", JSON.stringify(images))
    }
  }, [images])

  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))]

  const addImage = () => {
    if (newImage.url && newImage.title) {
      const image: GalleryImage = {
        id: Date.now(),
        url: newImage.url,
        title: newImage.title,
        description: newImage.description,
        category: newImage.category,
        likes: 0,
        addedAt: new Date(),
      }
      setImages([image, ...images])
      setNewImage({ url: "", title: "", description: "", category: "nature" })
      setShowAddForm(false)
    }
  }

  const deleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
    if (selectedImage?.id === id) {
      setSelectedImage(null)
    }
  }

  const likeImage = (id: number) => {
    setImages(images.map((img) => (img.id === id ? { ...img, likes: img.likes + 1 } : img)))
    if (selectedImage?.id === id) {
      setSelectedImage({ ...selectedImage, likes: selectedImage.likes + 1 })
    }
  }

  // Filter and sort images
  const filteredImages = images.filter((img) => {
    const matchesSearch =
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "likes":
        return b.likes - a.likes
      default:
        return b.addedAt.getTime() - a.addedAt.getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dynamic Image Gallery</h1>
          <p className="text-lg text-gray-600">
            Interactive gallery with search, filtering, and dynamic content management
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="likes">Sort by Likes</option>
              </select>
            </div>

            {/* View Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>
          </div>

          {/* Add Image Form */}
          {showAddForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Image</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Image title"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="nature">Nature</option>
                  <option value="architecture">Architecture</option>
                  <option value="art">Art</option>
                  <option value="photography">Photography</option>
                  <option value="design">Design</option>
                </select>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={addImage}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Image
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        {sortedImages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Eye className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {sortedImages.map((image) => (
              <div
                key={image.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className={`w-full object-cover cursor-pointer hover:opacity-90 transition-opacity ${
                      viewMode === "list" ? "h-32" : "h-48"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                </div>

                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{image.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => likeImage(image.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{image.likes}</span>
                      </button>
                      <span className="text-xs text-gray-500">{image.addedAt.toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto">
              <div className="relative">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {selectedImage.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likeImage(selectedImage.id)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{selectedImage.likes}</span>
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{selectedImage.description}</p>

                <div className="text-sm text-gray-500">Added on {selectedImage.addedAt.toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Features Info */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Features</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                Dynamic image loading
              </li>
              <li className="flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-500" />
                Real-time search
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-indigo-500" />
                Multiple view modes
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-indigo-500" />
                Interactive like system
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-500" />
                Add/remove functionality
              </li>
              <li className="flex items-center gap-2">
                <List className="w-4 h-4 text-indigo-500" />
                Category filtering
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
