import { contacts, groups } from "./data";
import { toggleArchive } from "./main";
import { showError } from "./utils";

export function renderContactsList(contacts, messages) {
  if (!contacts || contacts.length === 0) {
    return `<p class="text-gray-500">Aucun contact trouvé.</p>`;
  }
  // Sort contacts by first name
  contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  // Generate HTML for each contact
  const filteredContacts = contacts.filter((c) => !c.archived);
  if (filteredContacts.length === 0) {
    return `<p class="text-gray-500">Aucun contact actif trouvé.</p>`;
  }
  // Return the complete HTML structure
  filteredContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));

  return `
      <div 
        id="pageHeader"
        class="flex justify-between items-center border-b border-[#f4f4f4be] pb-1 mb-2">
          <h1 class="text-xl text-gray-900">Messages</h1>
          <div class="actions flex gap-2">
            <span id="messageMenuBtn" class="text-gray-500 px-4 py-2 rounded cursor-pointer"><i class="fa-solid fa-ellipsis-vertical fa-lg"></i></span>
          </div>
          </div>
          <div
          class="search flex justify-center items-center gap-2 border border-gray-300 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="pl-1"
          >
            <path
              fill=""
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
          <input
            type="text"
            name=""
            id=""
            class="flex-1 p-1 border-inherit focus:outline-none"
            placeholder="Recherche"
          />
        </div>

          <div class="flex flex-col gap-3 my-3">
            ${filteredContacts
              .map(
                (c) => `
              <div class="contact-item flex justify-between gap-3 border p-2 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer" data-id="${
                c.id
              }">
                <div class="flex gap-2">
                  ${
                    c.avatar
                      ? `
                    <img src="/assets/${c.avatar}" alt="${c.profile}" class="w-10 h-10 rounded-full" /> `
                      : `
                    <span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 text-sm">${c.profile}</span>`
                  }
                  <div>
                    <div class="font-medium text-gray-900">${c.firstName} ${
                  c.lastName
                }</div>
                    <div class="text-xs text-gray-500 flex justify-between items-center">
                    <span>${c.phoneNumber}<span>
                    
                    </div>
                    <div>
                    <span class="text-xs text-gray-500">${c.infos.slice(
                      0,
                      20
                    )}...</span>
                      <span class="hidden hover:block"><i class="fa-solid fa-chevron-down"></i></span>
                    </div>
                  </div>
                </div>
                <div class="actions">
                  <span class="text-xs">10:30</span>
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                
              </div>
            `
              )
              .join("")}
          </div>
        `;
}

export function renderGroupsList(groups, contacts) {
  return `
    <ul class="list-none flex flex-col gap-3">
      <li class="w-full border-b-2 border-gray-200 mb-2">
        <span id="btnAddGroup" class="flex items-center gap-2 text-gray-500 px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
          <i class="fa-solid fa-user-plus fa-lg"></i> Nouveau groupe
        </span>
      </li>

      ${groups
        .map((g) => {
          const memberNames = g.members
            .map((id) => contacts.find((c) => c.id === id)?.firstName)
            .join(", ");
          return `
            <li class="group-item flex items-center gap-4 p-4 border rounded-lg shadow hover:bg-gray-50 transition cursor-pointer" data-id="${
              g.id
            }">
              ${
                g.pic
                  ? `<img src="/assets/${g.picture}" alt="${g.name}" class="w-12 h-12 rounded-full" />`
                  : `<span class="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 text-sm font-bold uppercase">${g.name.slice(
                      0,
                      2
                    )}</span>`
              }
              <div class="flex flex-col flex-1">
                <span class="font-medium text-gray-900 text-base">${
                  g.name
                }</span>
                <div class="flex justify-between items-center gap-2 text-sm text-gray-700">
                  <span class="text-sm text-gray-700">Membres : ${memberNames}</span>
                  <span id="addMembers" class="hidden"><i class="fa-solid fa-user-plus"></i></span>
                </div>
                <span class="text-xs text-gray-500 italic">${
                  g.description
                }</span>
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

export function renderArchived() {
  const archived = contacts.filter((c) => c.archived);
  if (!archived || archived.length === 0) {
    return `<p class="text-gray-500">Aucun contact trouvé.</p>`;
  }

  return `
      <div 
        id="pageHeader"
        class="flex justify-between items-center border-b border-[#f4f4f4be] pb-1 mb-2">
          <h1 class="text-xl text-gray-900">Archives</h1>
          <div class="actions flex gap-2">
            <span id="archiveBtn" class="text-gray-500 px-4 py-2 rounded cursor-pointer"><i class="fa-solid fa-ellipsis-vertical fa-lg"></i></span>
          </div>
          </div>
          <div
          class="search flex justify-center items-center gap-2 border rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill=""
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
          <input
            type="text"
            name=""
            id=""
            class="flex-1 p-1 border-inherit focus:outline-none"
            placeholder="Recherche"
          />
        </div>
          <hr>
          <div class="flex flex-col gap-3 my-3">
            ${archived
              .map(
                (c) => `
              <div class="contact-item flex justify-between gap-3 border p-2 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer" data-id="${
                c.id
              }">
                <div class="flex gap-2">
                  ${
                    c.avatar
                      ? `
                    <img src="/assets/${c.avatar}" alt="${c.profile}" class="w-10 h-10 rounded-full" /> `
                      : `
                    <span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 text-xs">${c.profile}</span>`
                  }
                  <div>
                    <div class="font-medium text-gray-900">${c.firstName} ${
                  c.lastName
                }</div>
                    <div class="text-xs text-gray-500">${c.phoneNumber}</div>
                  </div>
                </div>
                <div class="actions">
                  <span id="unarchiveBtn" class="text-gray-500"><i class="fa-solid fa-box-archive"></i></span>
                </div>
                
              </div>
            `
              )
              .join("")}
          </div>
        `;
}

export function renderContactDetails(contact) {
  const content = document.querySelector("#content");

  content.innerHTML = `
    <div
          id="contentHeader"
          class="flex justify-between bg-[#dec18f47] px-2"
        >
          <div class="profile flex items-center gap-2">
            ${
              contact.avatar
                ? `<img src="/assets/${contact.avatar}" alt="${contact.firstName} ${contact.lastName}" class="w-12 h-12 rounded-full" />`
                : `<span class="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 text-lg font-bold">${contact.profile}</span>`
            }
            <div class="profile-info">
              <div id="title" class="">${
                contact.firstName + " " + contact.lastName
                  ? contact.firstName + " " + contact.lastName
                  : contact.phoneNumber
              }</div>
              <div id="description" class="text-sm"></div>
            </div>
          </div>
          <div id="actions" class="flex gap-2 p-1">
            <span
              id=""
              class="w-8 h-8 rounded-full border border-[#dfb346] flex justify-center items-center cursor-pointer"
            >
                <i class="fa-solid fa-delete-left text-orange-400"></i>
            </span>
            <span
              id="archiveBtn"
              class="w-8 h-8 rounded-full border border-gray-400 flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-box-archive text-gray-400"></i>
            </span>
            <span
              class="w-8 h-8 rounded-full border border-black flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-stop text-black"></i>
            </span>
            <span
              class="w-8 h-8 rounded-full border border-red-700 flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-trash text-red-700"></i>
            </span>
          </div>
        </div>

        <div id="contentBody" class="bg-[#dec18f47] flex-1"></div>

        <div id="contentFooter" class="flex justify-between gap-2 p-2">
          <input
            type="text"
            name=""
            id=""
            class="text-sm pl-2 flex-1 border border-gray-400 bg-gray-200 rounded-lg focus:outline-none"
          />
          <span
            id="sendBtn"
            class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="#fff"
                d="m18.72 6.78l-1.44 1.44L24.063 15H4v2h20.063l-6.782 6.78l1.44 1.44l8.5-8.5l.686-.72l-.687-.72z"
              />
            </svg>
          </span>
        </div>
  `;
  // If no contact is provided, return a message
  if (!contact || Object.keys(contact).length === 0) {
    return `<p class="text-gray-500">Aucun contact sélectionné.</p>`;
  }
  // If contact is provided, render the details
  content.innerHTML += renderContactDetailsContent(contact);
  // Add event listeners for buttons
  document.querySelector("#btnEditContact").addEventListener("click", () => {
    // Logic to edit contact
    console.log("Edit contact:", contact.id);
  });

  document.querySelector("#archiveBtn").addEventListener("click", () => {
    // Logic to archive contact
    console.log("Archive contact:", contact.id);
    toggleArchive(contact.id);
  });

  document.querySelector("#btnArchiveContact").addEventListener("click", () => {
    // Logic to archive contact
    console.log("Archive contact:", contact.id);
  });
  document.querySelector("#btnDeleteContact").addEventListener("click", () => {
    // Logic to delete contact
    console.log("Delete contact:", contact.id);
  });
  // document.querySelector("#contactMenuBtn").addEventListener("click", () => {
  //   // Logic to show contact menu
  //   console.log("Show contact menu for:", contact.id);
  // });
  document.querySelector("#messageMenuBtn").addEventListener("click", () => {
    // Logic to show message menu
    console.log("Show message menu for contact:", contact.id);
  });
  // document.querySelector("#archiveBtn").addEventListener("click", () => {
  //   // Logic to show archive menu
  //   console.log("Show archive menu");
  // });
  // document.querySelector("#btnAddGroup").addEventListener("click", () => {
  //   // Logic to add a new group
  //   console.log("Add new group");
  // });
  // document.querySelector("#unarchiveBtn").addEventListener("click", () => {
  //   // Logic to unarchive contact
  //   console.log("Unarchive contact:", contact.id);
  // });
  // document.querySelector("#btnAddContact").addEventListener("click", () => {
  //   // Logic to add a new contact
  //   console.log("Add new contact");
  // });
  return content.innerHTML;
}
function renderContactDetailsContent(contact) {
  return `
    <div class="contact-details p-4">
      <div class="flex items-center gap-4 mb-4">
        ${
          contact.avatar
            ? `<img src="/assets/${contact.avatar}" alt="${contact.firstName} ${contact.lastName}" class="w-16 h-16 rounded-full" />`
            : `<span class="flex justify-center items-center w-16 h-16 rounded-full bg-gray-200 text-lg font-bold">${contact.profile}</span>`
        }
        <div>
          <h2 class="text-xl font-semibold text-gray-900">${
            contact.firstName
          } ${contact.lastName}</h2>
          <p class="text-sm text-gray-600">${contact.phoneNumber}</p>
          <p class="text-xs text-gray-500">${contact.infos}</p>
        </div>
      </div>
      <div class="actions flex gap-2">
        <button id="btnEditContact" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Modifier</button>
        <button id="btnArchiveContact" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">Archiver</button>
        <button id="btnDeleteContact" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Supprimer</button>
      </div>
    </div>
  `;
}

export function renderGroupDetails(group) {
  const content = document.querySelector("#content");

  content.innerHTML = `
    <div
          id="contentHeader"
          class="flex justify-between bg-[#dec18f47] px-2"
        >
          <div class="profile flex items-center gap-2">
            ${
              group.pic
                ? `<img src="/assets/${group.picture}" alt="${group.name}" class="w-12 h-12 rounded-full" />`
                : `<span class="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 text-lg font-bold uppercase">${group.name.slice(
                    0,
                    2
                  )}</span>`
            }
            <div class="profile-info">
              <div id="title" class="">${group.name}</div>
              <div id="description" class="text-sm">${getMemberNames(
                group,
                contacts
              )}</div>
            </div>
          </div>
          <div id="actions" class="flex gap-2 p-1">
            <span
              id=""
              class="w-8 h-8 rounded-full border border-[#dfb346] flex justify-center items-center cursor-pointer"
            >
                <i class="fa-solid fa-delete-left text-orange-400"></i>
            </span>
            <span
              id="archiveBtn"
              class="w-8 h-8 rounded-full border border-gray-400 flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-box-archive text-gray-400"></i>
            </span>
            <span
              class="w-8 h-8 rounded-full border border-black flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-stop text-black"></i>
            </span>
            <span
              class="w-8 h-8 rounded-full border border-red-700 flex justify-center items-center cursor-pointer"
            >
              <i class="fa-solid fa-trash text-red-700"></i>
            </span>
          </div>
        </div>

        <div id="contentBody" class="bg-[#dec18f47] flex-1"></div>

        <div id="contentFooter" class="flex justify-between gap-2 p-2">
          <input
            type="text"
            name=""
            id=""
            class="text-sm pl-2 flex-1 border border-gray-400 bg-gray
            -200 rounded-lg focus:outline-none"
          />
          <span
            id="sendBtn"
            class="bg-green-500 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <path
                fill="#fff"
                d="m18.72 6.78l-1.44 1.44L24.063 15H4v2h20.063l-6.782 6.78l1.44 1.44l8.5-8.5l.686-.72l-.687-.72z"
              />
            </svg>
          </span>
        </div>
  `;
  // If no group is provided, return a message
  if (!group || Object.keys(group).length === 0) {
    return `<p class="text-gray-500">Aucun groupe sélectionné.</p>`;
  }
  // If group is provided, render the details
  // content.innerHTML += renderGroupDetailsContent(group, contacts);
  // Add event listeners for buttons
  // document.querySelector("#btnEditGroup").addEventListener("click", () => {
  //   // Logic to edit group
  //   console.log("Edit group:", group.id);
  // });
  document.querySelector("#archiveBtn").addEventListener("click", () => {
    // Logic to archive group
    console.log("Archive group:", group.id);
  });
  // document.querySelector("#btnArchiveGroup").addEventListener("click", () => {
  //   // Logic to archive group
  //   console.log("Archive group:", group.id);
  // });
  // document.querySelector("#btnDeleteGroup").addEventListener("click", () => {
  //   // Logic to delete group
  //   console.log("Delete group:", group.id);
  // });
  // document.querySelector("#groupMenuBtn").addEventListener("click", () => {
  //   // Logic to show group menu
  //   console.log("Show group menu for:", group.id);
  // });
  // document.querySelector("#messageMenuBtn").addEventListener("click", () => {
  //   // Logic to show message menu
  //   console.log("Show message menu for group:", group.id);
  // });
  // document.querySelector("#archiveBtn").addEventListener("click", () => {
  //   // Logic to show archive menu
  //   console.log("Show archive menu");
  // });
  // document.querySelector("#btnAddGroup").addEventListener("click", () => {
  //   // Logic to add a new group
  //   console.log("Add new group");
  // });
  // document.querySelector("#unarchiveBtn").addEventListener("click", () => {
  //   // Logic to unarchive group
  //   console.log("Unarchive group:", group.id);
  // });
  // document.querySelector("#btnAddContact").addEventListener("click", () => {
  //   // Logic to add a new contact
  //   console.log("Add new contact");
  // });
  return content.innerHTML;
}

function getMemberNames(group, contacts) {
  return group.members
    .map((id) => contacts.find((c) => c.id === id)?.firstName)
    .join(", ");
}

export function renderAddGroupMembers(groupId, contacts) {
  const page = document.querySelector("#page");

  const group = groups.find((g) => g.id === groupId);
  if (!group) {
    page.innerHTML = `<p class="text-gray-500">Groupe non trouvé.</p>`;
    return;
  }

  page.innerHTML = `
    <div><i class="fa-solid fa-arrow-left-long"></i></div>

    <div class="p-6 max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Ajouter des membres à "${group.name}"
      </h2>

      <form id="addMembers" class="flex flex-col gap-4">
        <div>
          <label class="block font-medium text-gray-700 mb-1">Membres disponibles :</label>
          <div class="error-message text-red-500 text-sm mb-2" data-error-for="member"></div>

          <div id="groupMembers" class="flex flex-col gap-2 max-h-64 overflow-y-auto border border-gray-300 p-3 rounded-md bg-gray-50">
            ${contacts
              .filter((c) => !c.archived && !group.members.includes(c.id))
              .map(
                (c) => `
                <label class="flex items-center gap-3 p-2 border rounded-md hover:bg-gray-100 transition cursor-pointer">
                  <input type="checkbox" value="${c.id}" />
                  ${
                    c.avatar
                      ? `<img src="/assets/${c.avatar}" alt="${c.name}" class="w-10 h-10 rounded-full" />`
                      : `<span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-gray-700 text-sm font-semibold">${c.profile}</span>`
                  }
                  <span class="text-gray-800 font-medium">${c.firstName} ${
                  c.lastName
                }</span>
                </label>
              `
              )
              .join("")}
          </div>
        </div>

        <button type="submit"
          class="w-full bg-orange-100 text-gray-900 font-semibold py-2 rounded hover:bg-orange-200 transition">
          Ajouter les membres
        </button>

        <div id="addGroupMessage" class="text-center text-sm text-gray-600 mt-2"></div>
      </form>
    </div>
  `;

  // Gestion du formulaire
  const form = document.querySelector("#addMembers");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedMembers = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => parseInt(checkbox.value));

    if (selectedMembers.length === 0) {
      showError("member", "Veuillez sélectionner au moins un membre.");
      return;
    }

    group.members.push(...selectedMembers);
    document.querySelector("#addGroupMessage").textContent =
      "Membres ajoutés avec succès !";

    // Mise à jour du compteur sélectionné
    const checkboxes = document.querySelectorAll(
      "#groupMembers input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedCount = Array.from(checkboxes).filter(
          (cb) => cb.checked
        ).length;
        document.querySelector(
          "#addGroupMessage"
        ).textContent = `${selectedCount} membre(s) sélectionné(s)`;
      });
    });
  });
}

// export function renderAddGroupMembers(groupId, contacts) {
//   const page = document.querySelector("#page");

//   // Find the group by ID
//   const group = groups.find((g) => g.id === groupId);
//   if (!group) {
//     page.innerHTML = `<p class="text-gray-500">Groupe non trouvé.</p>`;
//   }
//   page.innerHTML = `
//     <div class="add-group-members p-4  top-28 bg-white shadow-lg rounded-lg">
//       <form id="addMembers" class="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg w-96 mx-auto mt-8">
//       <h2 class="text-xl font-semibold text-gray-900 mb-4">Ajouter des membres au groupe "${group.name}"</h2>
//         <label class="block font-medium mb-1">Ajouter des membres :</label>
//         <div class="error-message text-red-500 text-sm mb-2" data-error-for="member"></div>
//         <div id="groupMembers" class="flex flex-col gap-2 max-h-full overflow-auto border p-2 rounded bg-gray-50">
//           ${contacts
//             .filter((c) => !c.archived && !group.members.includes(c.id))
//             .map(
//               (c) => `
//               <label class="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <input type="checkbox" value="${c.id}" />
//                 ${
//                   c.avatar
//                     ? `<img src="/assets/${c.avatar}" alt="${c.profile}" class="w-10 h-10 rounded-full" />`
//                     : `<span class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200 text-sm">${c.profile}</span>`
//                 }
//                 <span class="font-medium">${c.firstName} ${c.lastName}</span>
//               </label>
//             `
//             )
//             .join("")}
//         </div>
//       </div>

//       <button type="submit"
//         class="bg-gray-200 text-gray-600 py-2 rounded hover:bg-orange-200 transition">
//         Créer le groupe
//       </button>

//       <div id="addGroupMessage" class="text-sm mt-2"></div>
//     </form>

//     </div>
//   `;

//   // Add event listener for form submission
//   const form = document.querySelector("#addMembers");
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const selectedMembers = Array.from(
//       form.querySelectorAll('input[type="checkbox"]:checked')
//     ).map((checkbox) => parseInt(checkbox.value));

//     if (selectedMembers.length === 0) {
//       showError("member", "Veuillez sélectionner au moins un membre.");
//       return;
//     }

//     // Add members to the group
//     group.members.push(...selectedMembers);
//     // Show success message
//     document.querySelector("#addGroupMessage").textContent = "Membres ajoutés avec succès !";
//     // Optionally, you can redirect or update the UI
//   });
//   // Add event listener for checkbox changes
//   const checkboxes = document.querySelectorAll(
//     "#groupMembers input[type='checkbox']"
//   );
//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", () => {
//       const selectedCount = Array.from(checkboxes).filter(
//         (cb) => cb.checked
//       ).length;
//       document.querySelector("#addGroupMessage").textContent = `${selectedCount} membre(s) sélectionné(s)`;
//     });
//   });
// }

export function renderMessages(messages) {
  if (!messages || messages.length === 0) {
    return `<p class="text-gray-500">Aucun message trouvé.</p>`;
  }
  // Sort messages by date
  messages.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Generate HTML for each message
  return `
    <div class="flex flex-col gap-3">
      ${messages
        .map(
          (m) => `
        <div class="message-item p-3 border rounded-lg shadow hover:bg-gray-50 transition">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-gray-900">${m.sender}</span>
            <span class="text-xs text-gray-500">${new Date(
              m.date
            ).toLocaleString()}</span>
          </div>
          <p class="text-gray-700">${m.content}</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}
