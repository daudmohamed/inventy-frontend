const API_URL = process.env.API_URL || 'http://localhost:8080'

export const fetchItems = async (type: 'inventory' | 'shopping') => {
  let url = '/item'
  switch (type) {
    case 'inventory':
      url = '/item'
      break
    case 'shopping':
      url = '/shopping'
      break
  }
  const response = await fetch(`${API_URL} + ${url}`)
  return await response.json()
}

export const addItem = async (item: ItemDTO) => {
  let url = '/item'
  const response = fetch('http://localhost:8080/item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  return response.then((res) => res.json())
}
