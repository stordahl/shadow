// JS for shadow.blkcatstudio.com
// by Jacob Stordahl | jacobstordahl.net

window.addEventListener('load', ()=> {
  // Clock
    function clock(){
        const clock = new Date();

        let hours = clock.getHours();
        let minutes = clock.getMinutes();

        hours = ("0" + hours).slice(-2);
        minutes = ("0" + minutes).slice(-2);

        document.getElementById('time').textContent =
          hours + ":" + minutes ;
    }
    setInterval(clock, 1000);


    // Weather

    let long;
    let lat;
    let desc = document.getElementById('desc');
    let temp = document.getElementById('temp');
    let degree = document.getElementById('degree');
    let tempCont = document.getElementById('temp-cont');

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/f28f306b5341a009ca6aaa83c3060134/${lat},${long}`;

        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data =>{
            console.log(data)
            const {temperature, summary} = data.currently;

            //inject weather data
            temp.textContent = Math.round(temperature);
            desc.textContent = summary;

            //formula for celsius
            let celsius = Math.round((temperature - 32) * (5 / 9));

            //change f/c
            tempCont.addEventListener('click', ()=>{
              if (degree.textContent === "f"){
                degree.textContent = "c";
                temp.textContent = celsius;
              } else{
                degree.textContent = "f";
                temp.textContent = Math.round(temperature);
              }
            })
          }
        )
      });
    }

    //Random Color

    const colors = ['#8DD390', '#F5CA55', '#F47070', '#7895F7', '#FBFBFF'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    let elements = document.getElementsByClassName("color");

      document.getElementById("wrapper").style.backgroundColor = randomColor;
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = randomColor;
      }
});
