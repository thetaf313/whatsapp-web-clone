//

export function create(tag, props = {}, cls = {}, content='') {
  if (typeof tag !== "string") return null;

  const el = document.createElement(tag);
  // const fragment = document.createDocumentFragment();
  if (typeof cls === 'object') {
    for (key in cls) {
      el.className = cls[key];
    }
  }

  for (key in props) {
    let value = props[key];

    switch (view) {
      case 'id':
        el.setAttribute(key, value);
        break;
      case 'vShow':
        el.setAttribute(key, value);
        break;
      default:
        throw new Error('Prop invalide !');
        break;
    }
  }

  el.addNode = function(node) {
    if (node instanceof Node){
      this.appendChild(node);
      return this;
    }
  }

  return el;
}



export function createElement(tag, props = {}, content = "") {
  if (typeof tag !== "string") return null;
  // Gestion de v-if
  if ("vIf" in props && props.vIf === false) return null;
  
  const el = document.createElement(tag);
  const fragment = document.createDocumentFragment();
  
  // Gestion de v-for ..Array(100).valuesetourne un fragment)
  if ("vFor" in props) {

    const { each, render } = props.vFor;

    console.log(render);
    each.forEach((item) => {
      const child = render(item);
      if (child instanceof Node) {
        fragment.appendChild(child);
      }
    });
    // return fragment;
    // content = [fragment]
  }


  for (const key in props) {
    const value = props[key];

    // Classes
    if (key === "class" || key === "className") {
      el.className = Array.isArray(value) ? value.join(" ") : value;
    }

    // Événements
    else if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    }

    // v-show => toggle `display: none`
    else if (key === "vShow") {
      el.style.display = value ? "" : "none";
    }

    // vIf et vFor
    else if (key === "vIf" || key === "vFor") {
      continue;
    }

    // :attr => dynamic binding
    else if (key.startsWith(":")) {
      const realAttr = key.slice(1);
      el.setAttribute(realAttr, value);
    }

    // style objet
    else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    }

    // Attribut HTML classique
    else {
      el.setAttribute(key, value);
    }
  }

  // Contenu : string | Node | array
  if (Array.isArray(content)) {
    content.forEach((item) => {
      if (typeof item === "string") {
        el.appendChild(document.createTextNode(item));
      } else if (item instanceof Node) {
        el.appendChild(item);
      }
    });
  } else if (typeof content === "string" || typeof content === "number") {
    el.textContent = content;
  } else if (content instanceof Node) {
    el.appendChild(content);
  }

  // Méthodes pour chaînage
  el.addElement = function (tag, props = {}, content = "") {
    const newEl = createElement(tag, props, content);
    this.appendChild(newEl);
    return this;
  };
  el.addNode = function (node) {
    this.appendChild(node);
    return this;
  };

  return el.addNode(fragment);
}



export function checkRequire(inputs){
    inputs.forEach(input => {
        
        if(!input.value.trim()){
            errorMsg(input,`${inputName(input)} is required!`)
        }else{
            successMsg(input)
        }
    });
}

function checkLength(input,min,max){
    if(input.value.trim().length < min){
        errorMsg(input,`${inputName(input)} must be at least ${min} characters!`)
    }else if(input.value.trim().length > max){
        errorMsg(input,`${inputName(input)} must be less than ${max} characters!`)
    }else{
        successMsg(input)
    }
}

// export function errorMsg(input,message){
//     const parentEl = input.parentElement
//     parentEl.className = "form-control error"
//     parentEl.querySelector("small").innerText = message
// }

export function clearErrors() {
  const errorFields = document.querySelectorAll("[data-error-for]");
  errorFields.forEach(div => {
    div.textContent = "";
  });
}

export function showError(field, message) {
  const errorDiv = document.querySelector(`[data-error-for="${field}"]`);
  if (errorDiv) {
    errorDiv.textContent = message;
  }
}



export function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export function createAvatar(name, color = "#ccc") {
  const initials = getInitials(name);
  return `
    <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style="background:${color}">
      ${initials}
    </div>`;
}

export function randomColor() {
  const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24"];
  return colors[Math.floor(Math.random() * colors.length)];
}