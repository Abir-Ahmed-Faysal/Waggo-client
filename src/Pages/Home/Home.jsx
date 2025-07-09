import { Link } from 'react-router'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from 'react'
import { motion } from 'framer-motion'

const petCategories = [
  { name: 'Cats', image: '/assets/cat.jpg' },
  { name: 'Dogs', image: '/assets/dog.jpg' },
  { name: 'Parrots', image: '/assets/parrot.jpg' },
  { name: 'Rabbits', image: '/assets/rabbit.jpg' },
  { name: 'Fish', image: '/assets/fish.jpg' },
  { name: 'Hamsters', image: '/assets/hamster.jpg' },
]

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="">
      
      {/* Banner */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-[url('https://i.ibb.co/5hz32WKZ/Pet-adoption-1536x865.webp')]">
        <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Forever Friend</h1>
          <p className="mb-6 text-lg">Adopt a pet today and change a life forever.</p>
          <Link to="/pets">
            <Button variant="secondary">Browse Pets</Button>
          </Link>
        </div>
      </section>

      {/* Pet Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Choose a Pet Category</h2>
          <p className="text-gray-500 dark:text-gray-300">Explore and adopt pets from your favorite category</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {petCategories.map((pet, index) => (
            <motion.div
              key={pet.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/pets?category=${pet.name.toLowerCase()}`}>
                <Card className="hover:shadow-xl transition">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <CardContent className="text-center py-4">
                    <h3 className="text-xl font-semibold">{pet.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-pink-200 dark:from-gray-800 dark:to-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-4">Give a Homeless Pet a Second Chance</h2>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">Your kindness can save lives. Become a hero in a pet’s life by adopting today.</p>
        <Link to="/pets">
          <Button className="text-lg px-6 py-3">Adopt Now</Button>
        </Link>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">About Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our goal is to create a bridge between pets and people by making adoption accessible, easy, and compassionate. We are a dedicated team that believes every animal deserves love, care, and a forever home.
          </p>
        </div>
      </section>

      {/* Extra Section 1: Volunteer */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Become a Volunteer</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to help but can’t adopt? Join our team and become a part of something special. Volunteers make a real impact in the lives of animals every day.
          </p>
          <Link to="/volunteer">
            <Button>Join as Volunteer</Button>
          </Link>
        </div>
      </section>

      {/* Extra Section 2: Happy Adoptions */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Happy Tails</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hear heartwarming stories from those who found love and joy through adoption. These inspiring stories motivate us to keep going.
          </p>
          <Link to="/success-stories">
            <Button variant="outline">Read Stories</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
