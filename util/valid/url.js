function isValidUrl(urls) {

  const parsedUrls = JSON.parse(urls)
    const excludedUrls = ["https://www.next.co.uk/"];


    if (excludedUrls.includes(parsedUrls)) {
      return false;
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#][^\s]*$/;
    
    for (const url of parsedUrls) {
      if (!urlRegex.test(url)) {
        return false;
      }
    }
    return true;
  }


module.exports = isValidUrl;
