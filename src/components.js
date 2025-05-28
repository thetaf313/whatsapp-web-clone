import { contacts } from "./data";

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

  // Return the complete HTML structure

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
                    <span class="text-xs text-gray-500">${c.infos.slice(0,20)}...</span>
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
            <li class="group-item flex items-center gap-4 p-4 border rounded-lg shadow hover:bg-gray-50 transition" data-id="${g.id}">
              ${
                g.pic
                  ? `<img src="/assets/${g.picture}" alt="${g.name}" class="w-12 h-12 rounded-full" />`
                  : `<span class="flex justify-center items-center w-12 h-12 rounded-full bg-gray-200 text-sm font-bold uppercase">${g.name.slice(0, 2)}</span>`
              }
              <div class="flex flex-col">
                <span class="font-medium text-gray-900 text-base">${g.name}</span>
                <span class="text-sm text-gray-700">Membres : ${memberNames}</span>
                <span class="text-xs text-gray-500 italic">${g.description}</span>
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
