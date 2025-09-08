

const CACHE_KEY = 'googleBooksCache'
const CACHE_DURATION = 1000 * 60 * 15 // 15 minutes

export const googleBookService ={
    query
}

function query(searchText = '') {
    if (!searchText) return Promise.resolve([])
    
    // Check cache first
    const cachedResult = _getCachedResult(searchText)
    if (cachedResult) {
        return Promise.resolve(cachedResult)
    }
    
    // const API_KEY = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript'
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}&maxResults=5`
    
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.items) return []
            
            const books = data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title || 'Unknown Title',
                authors: item.volumeInfo.authors || ['Unknown Author'],
                publishedDate: item.volumeInfo.publishedDate || '',
                description: item.volumeInfo.description || 'No description available',
                thumbnail: (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) || 'https://picsum.photos/150/200',
                pageCount: item.volumeInfo.pageCount || 0,
                categories: item.volumeInfo.categories || []
            }))
            
            // Cache the result
            _cacheResult(searchText, books)
            return books
        })
        .catch(err => {
            console.error('Error fetching from Google Books API:', err)
            return []
        })
}

function _getCachedResult(searchText) {
    try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
        const result = cache[searchText]
        
        if (result && Date.now() - result.timestamp < CACHE_DURATION) {
            console.log('Using cached result for:', searchText)
            return result.data
        }
        return null
    } catch (err) {
        console.error('Error reading cache:', err)
        return null
    }
}

function _cacheResult(searchText, books) {
    try {
        const cache = JSON.parse(localStorage.getItem(CACHE_KEY)) || {}
        cache[searchText] = {
            data: books,
            timestamp: Date.now()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
        console.log('Cached result for:', searchText)
    } catch (err) {
        console.error('Error writing cache:', err)
    }
}