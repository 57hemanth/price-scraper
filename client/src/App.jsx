import { AiOutlineRobot } from "react-icons/ai"
import { AiFillGithub } from "react-icons/ai"
import { TbArrowBigDownLines } from "react-icons/tb"
import { FiLink2 } from "react-icons/fi"
import { useState } from "react"
import { Loader } from "./assets"

export default function App() {

  const [inputUrl, setInputUrl] = useState("")
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  function handleAddUrl(e) {
    e.preventDefault()
    setUrls(urls => [...urls, inputUrl])
    setInputUrl("")
  }

  async function getProductsDetails() {
    try {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ urls })
        })
        const res = await response.json()
        setData(res)
        setUrls([])
      } catch (error) {
          console.log(error)
      } finally {
        setLoading(false)
      }
  }

  return(
    <main className="max-w-7xl mx-auto px-4">
      <header className="py-4 flex flex-row justify-between items-center">
        <a href="/">
        <div className="flex flex-row text-2xl gap-1 items-center w-fit">
          <AiOutlineRobot className="text-teal-500" />
          <p className="font-bold">Dmart Scraper</p>
        </div>
        </a>
        <a href="https://github.com/57hemanth">
        <div className="flex flex-row text-md gap-1 items-center w-fit border border-gray-500 py-1 px-1 rounded">
          <AiFillGithub />
          <p>Github</p>
        </div>
        </a>
      </header>
      <section className="pt-4 md:pt-8">
        <div className="bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text">
          <h1 className="font-bold text-3xl md:text-5xl text-center">Scrape multiple products prices from Dmart</h1>
        </div>
        <p className="pt-2 md:pt-4 text-center text-sm md:text-lg">Just paste the URL and get the product data. You can scrape multiple products at a time. Get Started.</p>
      </section>
      <div className="pt-2 md:pt-6 flex justify-center text-3xl md:text-5xl">
        <TbArrowBigDownLines />
      </div>
      <section className="mt-4 md:mt-6 flex justify-center ">
        <form className="flex flex-row gap-2 flex-wrap max-w-xl" onSubmit={handleAddUrl}>
            <div className="flex flex-row items-center gap-2 border border-gray-500 rounded px-2 py-1">
              <FiLink2 />
              <input type="url" placeholder="Enter Dmart product URL" className="outline-none sm:w-96" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)}></input>
            </div>
            <button onClick={handleAddUrl} type="button" className="bg-teal-500 text-white px-2 py-1 rounded w-fit">Add</button>
        </form>
      </section>
      {urls.length > 0 && (
        <>
        <section className="max-w-md mx-auto mt-4 md:mt-6 flex flex-col gap-1 justify-center">
        { urls.map((url, i) => {
            return(
                <div className="flex flex-row border border-gray-300 rounded w-full items-center" key={i}>
                  <p className="bg-gray-200 py-1 px-2">{i+1}</p>
                  <p className="py-1 px-2 text-sm truncate">{url}</p>
                </div>
            )
          })
        }
        </section>
        <section className="mt-4 md:mt-6 flex justify-center">
          <button onClick={getProductsDetails} type="submit" className="bg-black text-white px-2 py-1 rounded">Scrape</button>
        </section>
        </>
      )}
      {loading && (
        <img className="mx-auto w-28" src={Loader}></img>
      )}
      { data.length > 0 && (
        <section className="mt-4 md:mt-6 mx-auto text-center flex flex-col gap-4 items-center justify-center">
          {data.map((res, i) => {
            return(
              <div className="flex flex-col gap-2 border border-gray-300 shadow rounded w-fit p-4 text-left" key={i}>
                <p><span className="font-bold">Product Name: </span>{res.title}</p>
                <p><span className="font-bold">Quantity: </span>{res.quantity}</p>
                <p><span className="font-bold">MRP: </span>{res.mrp}</p>
                <p><span className="font-bold">Price: </span>{res.price}</p>
                <p><span className="font-bold">Saving: </span>{res.saving}</p>
              </div>
            )
          })}
        </section>
      )}
    </main>
  )
}