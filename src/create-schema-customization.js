module.exports = ({ actions: { createTypes } }) => {
  const typeDefinitions = `
    type ContentfulImageGallery implements Node @derivedTypes @dontInfer {
      title: String!
      slug: String!
      images: [ContentfulAsset!]! @link(by: "id", from: "images___NODE")
      description: ContentfulImageGalleryDescription
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulImageGallerySys
      node_locale: String!
    }

    type ContentfulImageGalleryDescription {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
        
    type ContentfulImageGallerySys @derivedTypes {
      revision: Int
      contentType: ContentfulImageGallerySysContentType
    }
    
    type ContentfulImageGallerySysContentType @derivedTypes {
      sys: ContentfulImageGallerySysContentTypeSys
    }
    
    type ContentfulImageGallerySysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
  
    type ContentfulJsonObject implements Node @derivedTypes {
      title: String!
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulJsonObjectSys
      node_locale: String!
    }
    
    type ContentfulJsonObjectSys @derivedTypes {
      revision: Int
      contentType: ContentfulJsonObjectSysContentType
    }
    
    type ContentfulJsonObjectSysContentType @derivedTypes {
      sys: ContentfulJsonObjectSysContentTypeSys
    }
    
    type ContentfulJsonObjectSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulMessage implements Node @derivedTypes @dontInfer {
      title: String!
      content: ContentfulMessageContent
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulMessageSys
      node_locale: String!
    }

    type ContentfulMessageContent {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulMessageSys @derivedTypes {
      revision: Int
      contentType: ContentfulMessageSysContentType
    }
    
    type ContentfulMessageSysContentType @derivedTypes {
      sys: ContentfulMessageSysContentTypeSys
    }
    
    type ContentfulMessageSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulOrganization implements Node @derivedTypes @dontInfer {
      name: String!
      url: String
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulOrganizationSys
      node_locale: String!
    }
    
    type ContentfulOrganizationSys @derivedTypes {
      revision: Int
      contentType: ContentfulOrganizationSysContentType
    }
    
    type ContentfulOrganizationSysContentType @derivedTypes {
      sys: ContentfulOrganizationSysContentTypeSys
    }
    
    type ContentfulOrganizationSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulContentList implements Node @derivedTypes {
      title: String!
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulContentListSys
      node_locale: String!
    }
    
    type ContentfulPerson implements Node @derivedTypes @dontInfer {
      name: String!
      role: String!
      slug: String!
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      service: [ContentfulService] @link(by: "id", from: "service___NODE")
      biography: ContentfulPersonBiography
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulPersonSys
      node_locale: String!
      content_list: [ContentfulContentList] @link(by: "id", from: "content list___NODE") @proxy(from: "content list___NODE")
    }

    type ContentfulPersonBiography {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulService implements Node @derivedTypes @dontInfer {
      title: String!
      date: Date! @dateformat
      scriptureReadings: [String!]!
      slug: String!
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      preacher: ContentfulPerson! @link(by: "id", from: "preacher___NODE")
      videoUrl: String!
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulServiceSys
      node_locale: String!
    }
    
    type ContentfulServiceSys @derivedTypes {
      revision: Int
      contentType: ContentfulServiceSysContentType
    }
    
    type ContentfulServiceSysContentType @derivedTypes {
      sys: ContentfulServiceSysContentTypeSys
    }
    
    type ContentfulServiceSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulPersonSys @derivedTypes {
      revision: Int
      contentType: ContentfulPersonSysContentType
    }
    
    type ContentfulPersonSysContentType @derivedTypes {
      sys: ContentfulPersonSysContentTypeSys
    }
    
    type ContentfulPersonSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulContentListSys @derivedTypes {
      revision: Int
      contentType: ContentfulContentListSysContentType
    }
    
    type ContentfulContentListSysContentType @derivedTypes {
      sys: ContentfulContentListSysContentTypeSys
    }
    
    type ContentfulContentListSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulSimpleList implements Node @derivedTypes @dontInfer {
      title: String!
      values: [String!]!
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulSimpleListSys
      node_locale: String!
    }
    
    type ContentfulSimpleListSys @derivedTypes {
      revision: Int
      contentType: ContentfulSimpleListSysContentType
    }
    
    type ContentfulSimpleListSysContentType @derivedTypes {
      sys: ContentfulSimpleListSysContentTypeSys
    }
    
    type ContentfulSimpleListSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulEvent implements Node @derivedTypes @dontInfer {
      title: String!
      date: Date! @dateformat
      location: ContentfulEventLocation!
      slug: String!
      image: ContentfulAsset @link(by: "id", from: "image___NODE")
      details: ContentfulEventDetails
      spaceId: String
      contentful_id: String!
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      sys: ContentfulEventSys
      node_locale: String!
    }

    type ContentfulEventDetails {
      raw: String
      references: [ContentfulAsset] @link(by: "id", from: "references___NODE")
    }
    
    type ContentfulEventLocation {
      lon: Float!
      lat: Float
    }
    
    type ContentfulEventSys @derivedTypes {
      revision: Int
      contentType: ContentfulEventSysContentType
    }
    
    type ContentfulEventSysContentType @derivedTypes {
      sys: ContentfulEventSysContentTypeSys
    }
    
    type ContentfulEventSysContentTypeSys {
      type: String
      linkType: String
      id: String
      contentful_id: String
    }
    
    type ContentfulContentType implements Node @dontInfer {
      name: String
      displayField: String
      description: String
    }
  `;

  createTypes(typeDefinitions);
};
