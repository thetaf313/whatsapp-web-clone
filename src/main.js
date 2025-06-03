import "./styles.css";
import { contacts, groups } from "./data.js";
import {
  renderAddGroupMembers,
  renderArchived,
  renderArchivedGroupsEvent,
  renderContactDetails,
  renderContactsList,
  renderGroupDetails,
  renderGroupsList,
} from "./components.js";
import { showError, clearErrors, randomColor, getInitials } from "./utils.js";

document.addEventListener("DOMContentLoaded", initApp);

let selectedContactId = null;

export function loadView(view) {
  switch (view) {
    case "messages":
      page.innerHTML = `
        ${renderContactsList(contacts)}`;
      contactListeners();
      break;

    case "contacts":
      page.innerHTML = `<h2 class="text-xl font-bold mb-4">Contacts</h2>
        ${renderContactsList(contacts)}`;
      break;

    case "groupes":
      page.innerHTML = `<h2 class="text-xl font-bold mb-4">Groupes</h2>
        ${renderGroupsList(groups, contacts)}`;
      groupListeners();
      document
        .getElementById("btnAddGroup")
        .addEventListener("click", loadAddGroupForm);
      break;

    case "diffusions":
      page.innerHTML = `<h2 class="text-xl font-bold mb-4">Diffusions</h2>
        <p class="text-sm text-gray-500">Fonction à venir.</p>`;
      break;

    case "archives":
      page.innerHTML = `${renderArchived()}`;
      setupUnarchiveListeners();
      renderArchivedGroupsEvent(groups);
      break;

    case "nouveau":
      loadAddContactForm();
      break;

    default:
      page.innerHTML = `<p>Vue inconnue</p>`;
  }
}

function initApp() {
  console.log("app loaded !");

  const page = document.querySelector("#page");
  const content = document.querySelector("#content");

  // Gestion des clics du menu latéral
  document.querySelectorAll("#menu li").forEach((li) => {
    li.addEventListener("click", () => {
      const label = li.innerText.trim().toLowerCase();
      loadView(label);

      document
        .querySelectorAll("#menu li")
        .forEach((el) => el.classList.remove("active-menu"));
      li.classList.add("active-menu");
    });
  });

  //archive
  document.getElementById("archiveBtn").addEventListener("click", () => {
    console.log("Archiver le contact", selectedContactId);
    if (selectedContactId === null) return;

    const contact = contacts.find((c) => c.id === selectedContactId);
    if (contact) {
      contact.archived = true;

      // Supprime de la liste actuelle
      const contactElement = document.querySelector(
        `.contact-item[data-id="${selectedContactId}"]`
      );
      if (contactElement) {
        contactElement.remove();
      }

      selectedContactId = null;
    }
  });

  // Chargement initial
  loadView("messages");
}

function loadAddContactForm() {
  page.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Ajouter un contact</h2>

    <form id="addContactForm" class="flex flex-col gap-4">
      <div>
        <input type="text" id="firstName" placeholder="Prenom"
        class="p-2 border border-gray-300 w-full rounded focus:outline-none" />
        <div class="error-message text-red-500 text-sm mt-1" data-error-for="firstName"></div>
      </div>
      
      <div>
        <input type="text" id="lastName" placeholder="Nom"
        class="p-2 border border-gray-300 w-full  rounded focus:outline-none" />
         <div class="error-message text-red-500 text-sm mt-1" data-error-for="lastName"></div>
      </div>
      
      <div>
         <input type="text" id="phoneNumber" placeholder="Numero"
        class="p-2 border border-gray-300 w-full rounded focus:outline-none" />
        <div class="error-message text-red-500 text-sm mt-1" data-error-for="phoneNumber"></div>
      </div>
     
      <button type="submit"
        class="bg-gray-200 text-gray-800 py-2 rounded hover:bg-orange-200 transition">
        Ajouter
      </button>
    </form>
    <div id="addContactMessage" class="text-sm mt-2"></div>
  `;
  setupFormHandlers();
}

// function loadAddGroupForm() {
//   page.innerHTML = `
//     <h2 class="text-xl font-bold mb-4">Créer un groupe</h2>
//     <form id="addGroupForm" class="flex flex-col gap-4">
//       <div>
//         <input type="text" id="groupName" placeholder="Nom du groupe"
//         class="p-2 border border-gray-300 w-full rounded focus:outline-none" />
//         <div class="error-message text-red-500 text-sm mt-1" data-error-for="name"></div>
//       </div>

//       <input type="text" id="groupDescription" placeholder="Description"
//         class="p-2 border border-gray-300 rounded focus:outline-none" />
//       <label class="font-medium">Membres :</label>
//       <div class="error-message text-red-500 text-sm mt-1" data-error-for="member"></div>
//       <div id="groupMembers" class="flex flex-col gap-2 max-h-40 overflow-auto border p-2 rounded bg-gray-50">
//         ${contacts
//           .map(
//             (c) => `
//             <div class="contact-item flex justify-between gap-3 border p-2 rounded-lg shadow hover:bg-[#e3e0e04f] cursor-pointer" data-id="${
//               c.id
//             }">
//                 <div class="flex gap-2">
//                 <label class="flex items-center gap-2">
//               <input type="checkbox" value="${c.id}" />
//               ${c.firstName}
//             </label>
//                   ${
//                     c.avatar
//                       ? `
//                     <img src="/assets/${c.avatar}" alt="${c.profile}" class="w-10 h-10 rounded-full" /> `
//                       : `
//                     <span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 text-sm">${c.profile}</span>`
//                   }

//                     <div class="font-semibold">${c.firstName} ${
//               c.lastName
//             }</div>

//             </div>
//           `
//           )
//           .join("")}
//       </div>
//       <button type="submit"
//         class="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
//         Créer le groupe
//       </button>
//     </form>
//     <div id="addGroupMessage" class="text-sm mt-2"></div>
//   `;

//   document.getElementById("addGroupForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     const name = document.getElementById("groupName").value.trim();
//     const description = document
//       .getElementById("groupDescription")
//       .value.trim();
//     const selected = Array.from(
//       document.querySelectorAll("#groupMembers input:checked")
//     ).map((el) => parseInt(el.value));

//     let hasError = false;

//     if (!name) {
//       showError("name", "Le nom du groupe est requis.");
//       hasError = true;
//     }

//     if (selected.length < 2) {
//       showError("member", "Le groupe doit avoir au moins deux membres.");
//       hasError = true;
//     }

//     if (hasError) return;

//     const newGroup = {
//       id: Date.now(),
//       name,
//       description,
//       members: selected,
//     };

//     groups.push(newGroup);
//     document.getElementById("addGroupMessage").textContent =
//       "✅ Groupe créé avec succès !";

//     document.getElementById("addGroupForm").reset();
//     page.innerHTML = `${renderGroupsList()}`;

//     setTimeout(() => loadView("groupes"), 1000);
//   });
// }

function loadAddGroupForm() {
  page.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Créer un groupe</h2>
    <form id="addGroupForm" class="flex flex-col gap-4">
      
      <div>
        <label for="groupName" class="block font-medium mb-1">Nom du groupe</label>
        <input type="text" id="groupName" placeholder="Nom du groupe"
          class="p-2 border border-gray-300 w-full rounded focus:outline-none" />
        <div class="error-message text-red-500 text-sm mt-1" data-error-for="name"></div>
      </div>
      
      <div>
        <label for="groupDescription" class="block font-medium mb-1">Description</label>
        <input type="text" id="groupDescription" placeholder="Description"
          class="p-2 border border-gray-300 w-full rounded focus:outline-none" />
      </div>

      <div class="overflow-auto max-h-80">
        <label class="block font-medium mb-1">Membres :</label>
        <div class="error-message text-red-500 text-sm mb-2" data-error-for="member"></div>
        <div id="groupMembers" class="flex flex-col gap-2 max-h-full overflow-auto border p-2 rounded bg-gray-50">
          ${contacts
            .map(
              (c) => `
              <label class="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                <input type="checkbox" value="${c.id}" />
                ${
                  c.avatar
                    ? `<img src="/assets/${c.avatar}" alt="${c.profile}" class="w-10 h-10 rounded-full" />`
                    : `<span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 text-sm">${c.profile}</span>`
                }
                <span class="font-medium">${c.firstName} ${c.lastName}</span>
              </label>
            `
            )
            .join("")}
        </div>
      </div>

      <button type="submit"
        class="bg-gray-200 text-gray-600 py-2 rounded hover:bg-orange-200 transition">
        Créer le groupe
      </button>

      <div id="addGroupMessage" class="text-sm mt-2"></div>
    </form>
  `;

  document.getElementById("addGroupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("groupName").value.trim();
    const description = document
      .getElementById("groupDescription")
      .value.trim();
    const selected = Array.from(
      document.querySelectorAll("#groupMembers input:checked")
    ).map((el) => parseInt(el.value));

    let hasError = false;

    if (!name) {
      showError("name", "Le nom du groupe est requis.");
      hasError = true;
    }

    if (selected.length < 2) {
      showError("member", "Le groupe doit avoir au moins deux membres.");
      hasError = true;
    }

    if (hasError) return;

    const newGroup = {
      id: Date.now(),
      name,
      description,
      members: selected,
      archived: false, // Ajout de l'état d'archivage
    };

    groups.push(newGroup);
    document.getElementById("addGroupMessage").textContent =
      "✅ Groupe créé avec succès !";

    document.getElementById("addGroupForm").reset();
    // page.innerHTML = `${renderGroupsList(groups, contacts)}`;
    // groupListeners();
    //   document
    //     .getElementById("btnAddGroup")
    //     .addEventListener("click", loadAddGroupForm);

    setTimeout(() => loadView("groupes"), 1000);
  });
}

function setupFormHandlers() {
  const contactForm = document.getElementById("addContactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    let firstName = e.target.firstName.value.trim();
    const lastName = e.target.lastName.value.trim();
    const phone = e.target.phoneNumber.value.trim();

    let hasError = false;

    if (!firstName) {
      showError("firstName", "Le prénom est requis.");
      hasError = true;
    }

    // if (!lastName) {
    //   showError("lastName", "Le nom est requis.");
    //   hasError = true;
    // }

    if (!phone) {
      showError("phoneNumber", "Le numéro de téléphone est requis.");
      hasError = true;
    } else if (!/^\d{9,}$/.test(phone)) {
      showError("phoneNumber", "Le numéro n'est pas valide.");
      hasError = true;
    }
    // Vérifier si le numéro existe déjà
    const samePhoneUsers = contacts.filter(
      (user) => user.phoneNumber === phone
    );
    if (samePhoneUsers.length > 0) {
      showError("phoneNumber", "Ce numéro de téléphone existe déjà.");
      hasError = true;
      // Ajouter un chiffre au prénom
      firstName += samePhoneUsers.length;
    }

    const sameFirstName = contacts.filter(
      (user) => user.firstName === firstName
    );
    if (sameFirstName.length > 0) {
      // Ajouter un chiffre au prénom
      firstName += sameFirstName.length;
    }

    if (hasError) return;

    // Ajouter le nouveau contact
    contacts.push({
      id: Date.now(),
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      phoneNumber: `${phone}`,
      profile: getInitials(`${firstName} ${lastName}`),
      color: randomColor(),
      archived: false, // Ajout de l'état d'archivage
    });

    contactForm.reset();
    // page.innerHTML = `${renderContactsList(contacts)}`;
    // contactListeners();

    loadView("messages");
  });
}

function contentListeners() {
  const archiveBtn = document.getElementById("archiveBtn");
  if (!archiveBtn) {
    console.warn("archiveBtn non trouvé dans le DOM.");
    return;
  }

  archiveBtn.addEventListener("click", () => {
    console.log("Archiver le contact", selectedContactId);
    if (selectedContactId === null) return;

    const contact = contacts.find((c) => c.id === selectedContactId);
    if (contact) {
      contact.archived = true;
      const contactElement = document.querySelector(
        `.contact-item[data-id="${selectedContactId}"]`
      );
      if (contactElement) {
        contactElement.remove();
      }
      selectedContactId = null;
    }
  });
}

function contactListeners() {
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".contact-item")
        .forEach((el) => el.classList.remove("active-contact"));

      item.classList.add("active-contact");
      selectedContactId = parseInt(item.dataset.id);
      console.log("Contact sélectionné :", selectedContactId);
      const contact = contacts.find((c) => c.id === selectedContactId);
      renderContactDetails(contact);
    });
  });
  contentListeners();
}

function groupListeners() {
  document.querySelectorAll(".group-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".group-item")
        .forEach((el) => {
          el.classList.remove("active-group");
        });
      
      item.classList.add("active-group");
      item.querySelector("#addMembers").addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Ajouter des membres au groupe");
        const groupId = parseInt(item.dataset.id);
        const group = groups.find((g) => g.id === groupId);
        renderAddGroupMembers(groupId, contacts)
      });

      const groupId = parseInt(item.dataset.id);
      console.log("Groupe sélectionné :", groupId);
      const group = groups.find((g) => g.id === groupId);
      renderGroupDetails(group);
      // if (group) {
      //   page.innerHTML = `
      //     <h2 class="text-xl font-bold mb-4">${group.name}</h2>
      //     <p class="text-sm text-gray-500">${group.description}</p>
      //     <div class="mt-4">
      //       <h3 class="font-semibold mb-2">Membres :</h3>
      //       <ul class="list-disc pl-5">
      //         ${group.members
      //           .map(
      //             (memberId) =>
      //               `<li>${
      //                 contacts.find((c) => c.id === memberId).firstName
      //               }</li>`
      //           )
      //           .join("")}
      //       </ul>
      //     </div>
      //   `;
      // } else {
      //   page.innerHTML = `<p>Groupe non trouvé.</p>`;
      // }
    });
  });
}

export function toggleArchive(contactId) {
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    contact.archived = !contact.archived;
    loadView("messages");
  }
}

export function toggleArchiveGroup(groupId) {
  const group = groups.find((g) => g.id === groupId);
  if (group) {
    group.archived = !group.archived;
    loadView("groupes");
  }
}

function setupUnarchiveListeners() {
  document.querySelectorAll("#unarchiveBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const contactItem = e.target.closest(".contact-item");
      const id = parseInt(contactItem.dataset.id);
      const contact = contacts.find((c) => c.id === id);
      if (contact) {
        contact.archived = false;
        loadView("archives");
      }
    });
  });
}

function setupUnarchiveGroupListeners() {
  document.querySelectorAll("#unarchiveGroupBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const groupItem = e.target.closest(".group-item");
      const id = parseInt(groupItem.dataset.id);
      const group = groups.find((g) => g.id === id);
      if (group) {
        group.archived = false;
        loadView("archives");
      }
    });
  });
}
