// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

document.addEventListener('DOMContentLoaded', 
  function(){
    const domains = document.querySelector('.domains')
  
  
    program.init(domains);
  });
  

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {

  let domains;

  function displayDom(domainsList){
    if (domainsList.length === 0){
      displayError('Lén er ekki Skráð');
      return;
    }

    const [{ domain, registered, lastChange, expires,
       registrantname, email,
        address, country }] = domainsList;

    const dl = document.createElement('dl');
      //Lén
    const domainElement = document.createElement
    ('dt');
    domainElement.appendChild
    (document.createTextNode('Lén'));
    dl.appendChild(domainElement);

    const domainValueElement = document.createElement
    ('dd');
    domainValueElement.appendChild
    (document.createTextNode(domain));
    dl.appendChild(domainValueElement);

      //Skráð
    const registeredElement = document.createElement
    ('dt');
    registeredElement.appendChild
    (document.createTextNode('Skráð'));
    dl.appendChild(registeredElement);

    const registeredValueElement = document.createElement
    ('dd');
    registeredValueElement.appendChild
    (document.createTextNode(registered));
    dl.appendChild(registeredValueElement);

      //Seinast breytt
    const lastChangeElement = document.createElement
    ('dt');
    lastChangeElement.appendChild
    (document.createTextNode('Seinast breytt'));
    dl.appendChild(lastChangeElement);

    const lastChangeValueElement = document.createElement
    ('dd');
    lastChangeValueElement.appendChild
    (document.createTextNode(lastChange));
    dl.appendChild(lastChangeValueElement);

      //Rennur út
    const expiresElement = document.createElement
    ('dt');
    expiresElement.appendChild
    (document.createTextNode('Rennur út'));
    dl.appendChild(expiresElement);

    const expiresValueElement = document.createElement
    ('dd');
    expiresValueElement.appendChild
    (document.createTextNode(expires));
    dl.appendChild(expiresValueElement);

      //Skráningaraðili
     const registrantnameElement = document.createElement
    ('dt');
    registrantnameElement.appendChild
    (document.createTextNode('Skráningaraðili'));
    dl.appendChild(registrantnameElement);

    const registrantnameValueElement = document.createElement
    ('dd');
    registrantnameValueElement.appendChild
    (document.createTextNode(registrantname));
    dl.appendChild(registrantnameValueElement);

      //Netfang
    const emailElement = document.createElement
    ('dt');
    emailElement.appendChild
    (document.createTextNode('Netfang'));
    dl.appendChild(emailElement);

    const emailValueElement = document.createElement
    ('dd');
    emailValueElement.appendChild
    (document.createTextNode(email));
    dl.appendChild(emailValueElement);

      //Heimilisfang
    const addressElement = document.createElement
    ('dt');
    addressElement.appendChild
    (document.createTextNode('Heimilisfang'));
    dl.appendChild(addressElement);

    const addressValueElement = document.createElement
    ('dd');
    addressValueElement.appendChild
    (document.createTextNode(address));
    dl.appendChild(addressValueElement);

      //Land
    const countryElement = document.createElement
    ('dt');
    countryElement.appendChild
    (document.createTextNode('Land'));
    dl.appendChild(countryElement);

    const countryValueElement = document.createElement
    ('dd');
    countryValueElement.appendChild
    (document.createTextNode(country));
    dl.appendChild(countryValueElement);
    const container = domains.querySelector
    ('.results');

    while (container.firstChild){
      container.removeChild(container.firstChild);
    }
    container.appendChild(dl);
  }

  function displayError(error){
    const container = domains.querySelector
    ('.results');

    while (container.firstChild){
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode
      (error));
  }


  function fetchData(domain){
    fetch(`${API_URL}${domain}`)
      .then((response) => {
        if (response.ok){
          return response.json();
        }
          throw new Error('Villa við að sækja gögn');
        
      })
      .then((data) =>{
        console.log(data);
        displayDom(data.results);
      })
      .catch((error) =>{
        displayError('Lén verður að vera strengur');
        console.error(error);
      })
  }

  function onSubmit(e){
    e.preventDefault();

    const input = e.target.querySelector('input');

    // todo
    fetchData(input.value);
  }

  function init(_domains) {
    domains = _domains;


    const form = domains.querySelector('form');
    form.addEventListener('submit' , onSubmit);
  }


  return {
    init,
  };
})();


