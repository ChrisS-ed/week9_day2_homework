window.onload = function(){
  console.log('App started');
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  var countryNameList = [];
  var dropdown = document.getElementById('Countrylist')
  var section = document.getElementById('info')

  request.open('GET', url);



  var displayDropdown = function(countryNameList) {
    for (var i = 0; i < countryNameList.length; i++) {
      
      var option = document.createElement("option");
      option.innerText = countryNameList[i];

      var select = document.querySelector("select");
      select.appendChild(option);
    };
  }

  request.onload = function() {
    if (request.status === 200) {
      console.log("got the data");
      countriesData = JSON.parse(request.responseText);
      
      
      for (var i = 0; i < countriesData.length; i++) {
        countryNameList.push(countriesData[i].name);
      };
      displayDropdown(countryNameList);
      displayCountry(localStorage.getItem('Last country'));
    }
  }

  dropdown.onchange = function(){
    var countryName = this.value;
    var countryIndex = null;

    for(index in countryNameList){
      var testCountryName = countryNameList[index];
      if(testCountryName === countryName){
        var countryIndex = index;
        console.log(countryIndex);
        displayCountry(countryIndex);
      }
    }
  }

  var displayCountry = function(index){
    var name = countriesData[index]['name'];
    var capital = countriesData[index]['capital'];
    var population = countriesData[index]['population'];

    console.log(name, capital, population);

    localStorage.setItem('Last country', index)

    var blockquote = document.createElement('blockquote')
    blockquote.innerText = ('Country: ' + name + ' - Capital: ' + capital + ' - Population: ' + population)

    section.appendChild(blockquote)
  }

  request.send(null);

};