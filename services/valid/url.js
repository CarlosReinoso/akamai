function isValidUrl(url) {
    console.log("🚀 ~ isValidUrl ~ url:", url)
    const excludedUrls = ["https://www.next.co.uk/"];

    if (excludedUrls.includes(url)) {
      return false;
    }

    
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#][^\s]*$/;
    console.log("🚀 ~ isValidUrl ~ urlRegex:", urlRegex)
    console.log("🚀 ~ isValidUrl ~ urlRegex.test(url):", urlRegex.test(url))
    return urlRegex.test(url);
    return onlyOneHttps.test(url);
  }


module.exports = isValidUrl;
