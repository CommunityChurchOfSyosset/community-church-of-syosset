const axios = require('axios');
const path = require('path');

module.exports = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allContentfulEvent(sort: { fields: date, order: ASC }) {
        edges {
          next {
            slug
          }
          node {
            id
            location {
              lat
              lon
            }
            slug
          }
          previous {
            slug
          }
        }
      }
      allContentfulImageGallery(sort: {fields: title, order: ASC}) {
        edges {
          next {
            slug
          }
          node {
            id
            slug
          }
          previous {
            slug
          }
        }
      }
      allContentfulPerson {
        edges {
          node {
            id
            slug
          }
        }
      }
      allContentfulService(sort: { fields: date, order: DESC }) {
        edges {
          next {
            slug
          }
          node {
            id
            slug
          }
          previous {
            slug
          }
        }
      }
    }
  `);

  const events = result.data.allContentfulEvent.edges;
  await createEventPages(createPage, events);

  const imageGalleries = result.data.allContentfulImageGallery.edges;
  createImageGalleryPages(createPage, imageGalleries);

  const people = result.data.allContentfulPerson.edges;
  createPersonPages(createPage, people);

  const services = result.data.allContentfulService.edges;
  createServicePages(createPage, services);
};

async function createEventPages(createPage, events) {
  const geocodeDataCache = new Object();

  const eventPageCreations = events.map(async event => {
    const coordinates = `${event.node.location.lat},${event.node.location.lon}`;

    if (!geocodeDataCache.hasOwnProperty(coordinates)) {
      geocodeDataCache[coordinates] = await getGeocodeData(coordinates);
    }

    createPage({
      component: path.resolve('./src/templates/event.tsx'),
      context: {
        address: geocodeDataCache[coordinates]
          ? geocodeDataCache[coordinates].address
          : undefined,
        id: event.node.id,
        nextSlug: event.next && event.next.slug,
        placeId: geocodeDataCache[coordinates]
          ? geocodeDataCache[coordinates].placeId
          : undefined,
        prevSlug: event.previous && event.previous.slug,
      },
      path: `/events/${event.node.slug}`,
    });
  });

  await Promise.all(eventPageCreations);

  const ITEM_TYPE = 'events';
  const EVENTS_PER_NAVIGATION_PAGE = 12;

  const totalNavigationPages = Math.ceil(
    events.length / EVENTS_PER_NAVIGATION_PAGE
  );

  createPage({
    component: path.resolve('./src/templates/events.tsx'),
    context: {
      limit: EVENTS_PER_NAVIGATION_PAGE,
      pageIsIndex: true,
      pageNumber: 1,
      totalPages: totalNavigationPages,
    },
    path: '/events',
  });

  if (totalNavigationPages > 1) {
    createNavigationPages(
      createPage,
      totalNavigationPages,
      ITEM_TYPE,
      EVENTS_PER_NAVIGATION_PAGE
    );
  }
}

async function getGeocodeData(coordinates) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates}&key=${process.env.GOOGLE_GEOCODING_API_KEY}`
    );

    return response.data.results.length > 0
      ? {
          address: createAddress(response.data.results[0].address_components),
          placeId: response.data.results[0].place_id,
        }
      : undefined;
  } catch (error) {
    console.error(error);
  }
}

function createAddress(addressComponents) {
  const city = addressComponents.find(
    addressComponent =>
      addressComponent.types.includes('locality') ||
      addressComponent.types.includes('sublocality')
  ).long_name;

  const number = addressComponents.find(addressComponent =>
    addressComponent.types.includes('street_number')
  ).short_name;

  const state = addressComponents.find(addressComponent =>
    addressComponent.types.includes('administrative_area_level_1')
  ).short_name;

  const street = addressComponents.find(addressComponent =>
    addressComponent.types.includes('route')
  ).long_name;

  const zip = addressComponents.find(addressComponent =>
    addressComponent.types.includes('postal_code')
  ).short_name;

  return { city, number, state, street, zip };
}

function createImageGalleryPages(createPage, imageGalleries) {
  imageGalleries.forEach(imageGallery =>
    createPage({
      component: path.resolve('./src/templates/image-gallery.tsx'),
      context: {
        id: imageGallery.node.id,
        nextSlug: imageGallery.next && imageGallery.next.slug,
        prevSlug: imageGallery.previous && imageGallery.previous.slug,
      },
      path: `/images/${imageGallery.node.slug}`,
    })
  );

  const ITEM_TYPE = 'images';
  const GALLERIES_PER_NAVIGATION_PAGE = 12;

  const totalNavigationPages = Math.ceil(
    imageGalleries.length / GALLERIES_PER_NAVIGATION_PAGE
  );

  createPage({
    component: path.resolve('./src/templates/image-galleries.tsx'),
    context: {
      limit: GALLERIES_PER_NAVIGATION_PAGE,
      pageIsIndex: true,
      pageNumber: 1,
      totalPages: totalNavigationPages,
    },
    path: '/images',
  });

  if (totalNavigationPages > 1) {
    createNavigationPages(
      createPage,
      totalNavigationPages,
      ITEM_TYPE,
      GALLERIES_PER_NAVIGATION_PAGE
    );
  }
}

function createPersonPages(createPage, people) {
  people.forEach(person =>
    createPage({
      component: path.resolve('./src/templates/person.tsx'),
      context: {
        id: person.node.id,
      },
      path: `/people/${person.node.slug}`,
    })
  );
}

function createServicePages(createPage, services) {
  services.forEach(service =>
    createPage({
      component: path.resolve('./src/templates/service.tsx'),
      context: {
        id: service.node.id,
        nextSlug: service.next && service.next.slug,
        prevSlug: service.previous && service.previous.slug,
      },
      path: `/services/${service.node.slug}`,
    })
  );

  const ITEM_TYPE = 'services';
  const SERVICES_PER_NAVIGATION_PAGE = 12;

  const totalNavigationPages = Math.ceil(
    services.length / SERVICES_PER_NAVIGATION_PAGE
  );

  createPage({
    component: path.resolve('./src/templates/services.tsx'),
    context: {
      limit: SERVICES_PER_NAVIGATION_PAGE,
      pageIsIndex: true,
      pageNumber: 1,
      totalPages: totalNavigationPages,
    },
    path: '/services',
  });

  if (totalNavigationPages > 1) {
    createNavigationPages(
      createPage,
      totalNavigationPages,
      ITEM_TYPE,
      SERVICES_PER_NAVIGATION_PAGE
    );
  }
}

function createNavigationPages(createPage, totalPages, itemType, itemsPerPage) {
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    createPage({
      component: path.resolve(`./src/templates/${itemType}.tsx`),
      context: {
        limit: itemsPerPage,
        pageNumber,
        skip: (pageNumber - 1) * itemsPerPage,
        totalPages,
      },
      path: `/${itemType}/page/${pageNumber}`,
    });
  }
}
