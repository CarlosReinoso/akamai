function isValidUrl(urls) {

  const parsedUrls = JSON.parse(urls)
    const excludedUrls = ["https://www.next.co.uk/"];


    if (excludedUrls.includes(parsedUrls)) {
      return false;
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#][^\s]*$/;
    
    for (const url of parsedUrls) {
      console.log("🚀 ~ isValidUrl ~ url:", url)
      if (!urlRegex.test(url)) {
        console.log("🚀 ~ isValidUrl ~ !urlRegex.test(url):", !urlRegex.test(url))
        return false;
      }
    }
    return true;
  }


module.exports = isValidUrl;
