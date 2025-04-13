<!-----



Conversion time: 2.413 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β44
* Sun Apr 13 2025 03:04:33 GMT-0700 (PDT)
* Source doc: Fish Supply Chain Platform Design

* Tables are currently converted to HTML tables.
----->



# **A Multifunctional Digital Platform for a Sustainable and Traceable Fish Supply Chain in Kisumu**

**1. Introduction: The Untapped Potential of Digital Transformation in the Kisumu Fish Supply Chain**

The fish industry plays a pivotal role in the Kisumu region, significantly contributing to the local economy and providing essential livelihoods for a substantial portion of the population.<sup>1</sup> The Lake Victoria basin and the broader Western Kenya region are recognized as a vital food basket, where fishing and horticultural activities are central to the sustenance and economic well-being of millions of people who have resided in the surrounding areas for generations.<sup>1</sup> Given the importance of this sector, there exists a considerable opportunity to leverage the power of digital transformation to address existing inefficiencies, overcome prevailing challenges, and unlock new avenues for growth and sustainability within the Kisumu fish supply chain.

This report introduces the concept of a unified digital platform as a potentially transformative solution for the Kisumu fish supply chain. Such a platform offers the promise of connecting all key stakeholders within a cohesive digital ecosystem, thereby enhancing transparency, improving operational efficiency, promoting sustainable practices, and ensuring more equitable economic benefits for everyone involved. Drawing inspiration from the success of established digital giants like Alibaba and Uber, this initiative recognizes the need for a specifically tailored approach that is sensitive to the unique characteristics and complexities of the local fish industry.

The primary objectives of this report are to conceptualize a comprehensive architecture for such a platform, to define its key features and essential modules, to suggest appropriate user roles and effective access management strategies, to recommend suitable technologies for ensuring traceability and promoting sustainability, to propose robust incentivization strategies aimed at encouraging broad stakeholder participation, and to provide actionable user interface (UI) and user experience (UX) design considerations that are specifically adapted to the diverse user base within the Kisumu region.

**2. Deconstructing the Giants: Learning from Alibaba and Uber**



* **2.1. Alibaba: Mastering the E-commerce Ecosystem for Diverse Needs**
    * 2.1.1. Core Marketplace Functionalities: \
Alibaba.com operates as a leading global online marketplace that primarily connects business-to-business (B2B) suppliers with buyers who are seeking to invest in wholesale products.4 This platform effectively aids in establishing connections between a vast network of approximately 200 companies across the globe and numerous wholesalers, many of whom are headquartered in China.4 This framework empowers businesses in various countries, such as the United States, to identify manufacturers located abroad, commission the production of a diverse range of goods, and efficiently arrange for their subsequent distribution.4 \
A cornerstone of Alibaba's success lies in its comprehensive features that facilitate seamless buying and selling activities. The platform enables sellers to create detailed product listings that often include variations based on attributes like size, quantity, and color, catering to diverse buyer needs.<sup>4</sup> For efficient transaction management, Alibaba provides interactive order management dashboards for its users, allowing them to easily view and manage their orders, track their current status, and monitor shipping progress.<sup>4</sup> Furthermore, recognizing the importance of negotiation in B2B commerce, the platform supports direct price negotiation between buyers and suppliers through features such as the Request for Quotation (RFQ) system.<sup>8</sup> This system allows buyers to specify their product requirements and receive competitive quotes from interested suppliers.<sup>8</sup> Notably, Alibaba's platform also incorporates functionalities like minimum order quantities (MOQ) and maximum order quantities (MaxOQ), which are particularly crucial for businesses engaged in wholesale transactions.<sup>11</sup> \
Alibaba has developed robust payment processing capabilities to facilitate secure and convenient transactions. The platform supports multi-currency transactions, allowing businesses to trade in various global currencies.<sup>4</sup> It also accepts a wide array of payment methods, including major credit cards, popular digital wallets, traditional bank transfers, and in some instances, even cash on delivery.<sup>4</sup> To ensure the security and reliability of financial transactions, Alibaba has integrated secure payment gateways into its platform.<sup>4</sup> A key element of this security is the Trade Assurance service offered by Alibaba, which is designed to protect buyers' payments and ensure that they receive the goods they ordered according to the agreed-upon terms, thereby fostering a higher level of trust between buyers and sellers.<sup>5</sup> This service often involves holding the payment in escrow until the buyer confirms receipt and satisfaction with the goods.<sup>14</sup> \
Recognizing the critical role of logistics in e-commerce, Alibaba has also developed comprehensive logistics management features. The platform includes a logistics marketplace that helps buyers find and connect with reputable logistics service providers, offering a variety of transportation modes, including sea freight, air freight, and land transportation.<sup>18</sup> Many of these providers offer warehousing services and, importantly, real-time shipment tracking, allowing businesses to monitor the movement of their goods.<sup>18</sup> Alibaba.com Logistics Marketplace, for example, provides door-to-door shipping services, catering to diverse shipping needs and offering end-to-end visibility throughout the shipping process.<sup>20</sup>
    * 2.1.2. User Roles and Access Control: \
Within Alibaba's platform ecosystem, several key user roles are clearly defined. These include buyers, who utilize the platform to search for and purchase products; sellers, who encompass manufacturers, wholesalers, and distributors listing and selling their goods; and administrators, who are responsible for the overall management of the platform and the administration of user accounts.6 Alibaba effectively employs user profiles and permissions to manage access to different features and data, ensuring that users have tailored experiences based on their specific roles and responsibilities within the platform.11 Alibaba Cloud, the company's cloud computing arm, further exemplifies this through its robust role-based access control (RBAC) system, which allows for the precise management of user permissions across its various services.24 This granular control ensures that users only have access to the functionalities and information that are relevant to their roles, enhancing security and streamlining the user experience.
    * 2.1.3. Insights for the Fish Supply Chain Platform: \
The functionalities and strategies employed by Alibaba offer valuable insights for the development of the fish supply chain platform in Kisumu. The success of Alibaba underscores the importance of establishing a robust and user-friendly marketplace that facilitates efficient buying and selling activities. This marketplace should be complemented by secure payment processing mechanisms and comprehensive logistics management features to ensure smooth transactions and the timely movement of goods. Furthermore, the need for clearly defined user roles that mirror the various stakeholders within the fish supply chain is evident. Each role should have tailored access to the platform's features and information, optimizing their experience and enhancing their ability to conduct their respective activities effectively. Alibaba's business model, which primarily focuses on facilitating transactions between businesses (B2B) and directly connecting buyers with manufacturers and suppliers 5, provides a particularly relevant framework for the fish supply chain platform. This is because the fish supply chain also involves numerous transactions between various business entities, including fishermen, processing units, distributors, and retailers. Prioritizing features that enable direct interaction and negotiation between these stakeholders, similar to Alibaba's RFQ system 8, could lead to more efficient and transparent pricing mechanisms within the fish supply chain.
* **2.2. Uber: Revolutionizing Real-time Operations and Logistics through Technology**
    * 2.2.1. Core Operational and Tracking Features: \
A defining feature of Uber's platform is its capability for real-time tracking of drivers and the progress of a ride. This is achieved through the integration of GPS technology directly into the driver's mobile application.28 This real-time visibility provides both riders and Uber with continuous updates on the driver's location and the estimated time of arrival (ETA) at the pickup and drop-off points, significantly enhancing transparency and fostering user confidence in the service.28 \
Uber has also implemented an effective user role management system. This system provides distinct mobile applications and user interfaces that are specifically tailored to meet the unique needs of both drivers and riders, ensuring an intuitive and user-friendly experience for each group.<sup>28</sup> For instance, the Uber driver application includes features such as automatic turn-by-turn navigation, a comprehensive route overview, and detailed tracking of earnings.<sup>34</sup> Conversely, the Uber rider application allows users to easily request rides, monitor their driver's real-time location, and manage their payment preferences.<sup>35</sup> \
The platform also boasts an efficient booking and dispatch system. Users can request a ride for immediate pickup or conveniently schedule a ride for a future time. Uber's system utilizes sophisticated algorithms to intelligently match riders with available drivers who are located in their vicinity, optimizing efficiency and minimizing wait times.<sup>28</sup> This matching process takes into account various factors, including the rider's location, the availability of nearby drivers, and estimated travel times, to ensure a seamless and timely service.<sup>40</sup> \
Furthermore, Uber has integrated critical safety features into its platform. These include the option for riders to share their real-time ride tracking with trusted contacts, comprehensive driver profiles that include ratings and reviews from previous riders, and an easily accessible emergency assistance button that allows users to quickly contact local emergency services if needed.<sup>28</sup> These features demonstrate Uber's commitment to prioritizing user safety and building a high level of trust in its platform through enhanced transparency and accountability.<sup>28</sup>
    * 2.2.2. Insights for the Fish Supply Chain Platform: \
The operational model and technological infrastructure of Uber offer significant insights for the development of the fish supply chain platform in Kisumu. The paramount importance of incorporating robust real-time tracking capabilities is evident, as this would provide end-to-end visibility of fish products as they move from Lake Victoria to the final consumer. Similarly, the success of Uber's role-specific applications underscores the necessity of developing distinct and intuitive user interfaces that are specifically tailored to the needs and workflows of each stakeholder group involved in the fish supply chain. This would ensure optimal usability and encourage platform adoption across all user types. Moreover, Uber's two-way rating system, where both riders and drivers can provide feedback on their experiences 28, presents a valuable model for fostering accountability and quality within the fish supply chain platform. Adapting such a system could allow stakeholders like processors to rate fishermen on the quality of their catch, and retailers to rate distributors on the timeliness and condition of their deliveries, thereby incentivizing adherence to agreed-upon standards and promoting a culture of continuous improvement throughout the supply chain.

**3. The Kisumu Fish Supply Chain: Understanding the Local Ecosystem**



* 3.1. Key Stages and Stakeholders: \
The fish supply chain in the Kisumu region typically involves several key stages. It begins with fishermen conducting fishing activities on Lake Victoria, after which the harvested fish are brought to various landing sites along the lake's shores.1 From these landing sites, the fish may then be transported to processing units where they undergo various processes such as cleaning,solar drying, gutting, filleting, or smoking to add value and prepare them for market.1 Subsequently, distributors play a crucial role in transporting these processed fish products to different markets and retailers within the region.1 Finally, retailers, including market vendors and local shops, sell the fish to the end consumers.1 This chain involves several key stakeholders who are essential to its functioning. These include the fishermen who harvest the fish from the lake, boat owners who may own the fishing vessels, fishing guides who often possess valuable local knowledge about fishing locations, processing units that handle the post-harvest treatment of the fish, distributors responsible for transportation, retailers who act as the final point of sale, the end consumers who purchase the fish for consumption, and also the suppliers of fishing inputs such as nets, boats, and bait, who support the fishing activities.2 The fishing sector in the Kisumu region is a significant source of employment, providing livelihoods for a considerable number of individuals across these diverse roles within the entire value chain.2 This highlights the broad potential impact that improvements to this supply chain can have on the local population and economy.
* 3.2. Challenges and Opportunities: \
The current fish supply chain in Kisumu faces numerous significant challenges. Overfishing has led to a decline in fish stocks in Lake Victoria, threatening the sustainability of the industry.2 The prevalence of illegal fishing practices, such as the use of undersized nets, further exacerbates this issue by catching fish before they reach maturity.45 Inadequate infrastructure for fish preservation and transportation results in substantial post-harvest losses, reducing the overall value and availability of fish.2 Environmental pollution from agricultural runoff, industrial waste, and domestic sewage also poses a threat to fish health and quality.45 Additionally, fishermen and smaller-scale operators often face limitations in accessing wider markets, which can depress prices and hinder their economic growth.53 Lake Victoria, being the largest fishery in Kenya, has experienced fluctuating conditions due to factors like decreased fish imports from other regions and shifts in local consumer demand, underscoring the supply chain's vulnerability to external economic and logistical factors.2 These challenges, however, present significant opportunities for improvement through the implementation of a digital platform. Such a platform could provide fishermen with access to a broader network of buyers, potentially leading to more competitive prices for their catch. By streamlining logistics and improving market linkages, the platform could help to reduce post-harvest losses. Increased price transparency across the supply chain would empower stakeholders to make more informed decisions. Furthermore, the platform could facilitate the adoption and tracking of sustainable fishing practices, contributing to the long-term health and productivity of Lake Victoria's fisheries for future generations. It is also important to note that various existing efforts and organizations, including government agencies like the Kenya Marine and Fisheries Research Institute (KMFRI) and community-based groups such as Beach Management Units (BMUs), are already actively involved in working towards the sustainable management and development of the fisheries sector in the Kisumu region.53 The Lake Victoria Fisheries Organization (LVFO) serves as a crucial regional body that coordinates the management and development of fisheries resources within the East African Community, indicating a pre-existing framework for regional cooperation that a digital platform could potentially leverage.54 The platform should therefore aim to complement and integrate with these ongoing initiatives to maximize its overall effectiveness and reach within the local fishing industry.
* 3.3. Insights for the Platform Design: \
The design of the digital platform must be meticulously tailored to directly address the specific challenges and pain points that are currently experienced by each stakeholder group within the unique context of the Kisumu fish supply chain. A strong emphasis should be placed on developing features and functionalities that provide tangible and immediate value to the local stakeholders, particularly those who are directly involved in fishing and related activities on and around Lake Victoria. Furthermore, the platform's design should carefully consider and potentially leverage the existing social and organizational structures that are already present within the fishing communities, such as the well-established Beach Management Units (BMUs).56 Integrating with these existing community networks can significantly enhance the platform's adoption rate by building trust and facilitating the dissemination of crucial information regarding sustainable practices, market opportunities, and the overall benefits of participating in the digital ecosystem.

**4. Conceptualizing the Integrated Multifunctional Platform: Lake to Table in the Digital Age**



* 4.1. Core Value Proposition: \
The core value proposition of this integrated multifunctional platform is to establish a digital ecosystem that brings about transparency, enhances operational efficiency, promotes environmental sustainability, and ensures equitable economic benefits for all stakeholders actively participating in the fish supply chain within the Kisumu region.
* 4.2. Blending Alibaba's Marketplace with Uber's Operational Efficiency: \
The platform will strategically integrate core features inspired by Alibaba's successful e-commerce model to create a vibrant marketplace where stakeholders can seamlessly engage in the buying and selling of fish products, essential fishing inputs, and potentially other related services. Simultaneously, it will leverage real-time tracking and operational management principles drawn from Uber's platform to optimize the entire process of fish movement, from the initial capture in Lake Victoria through all subsequent stages until it reaches the end consumer's table.
* 4.3. Key Functionalities: \
The platform will incorporate several key functionalities to achieve its objectives. Fishermen will be empowered to easily list their daily or periodic catches, providing essential details such as the specific fish species, the quantity harvested, the precise location of capture within Lake Victoria, and the fishing methods that were employed. Processing units will be able to directly source raw fish from registered fishermen through the platform, efficiently manage their inventory of both raw and processed fish, list their value-added fish products (e.g., Dried Fish - fillets, smoked fish) for sale on the marketplace, and effectively manage their distribution channels to reach buyers. Distributors will be facilitated in connecting with a wider network of processing units to procure processed fish, efficiently manage the logistical aspects of transporting these products to various retailers and markets, and accurately track the status of their shipments. Retailers will be able to procure fish from verified distributors or potentially directly from processing units through the platform, allowing them to effectively manage their inventory levels of diverse fish products and potentially track their sales data to optimize their offerings. A dedicated marketplace will be established for suppliers of essential fishing inputs, such as nets, boats, bait, and fuel, to directly reach their target market of fishermen and other relevant stakeholders within the ecosystem, streamlining the procurement process. End consumers will benefit from enhanced transparency by having access to detailed information about the origin of the fish they purchase, including the specific fishing location, the identity of the fishermen involved in its capture, and comprehensive details about the sustainability practices that were followed throughout the supply chain. A robust real-time tracking system will be integrated into the platform to monitor the movement of fish at every critical stage of the supply chain, providing valuable visibility to all relevant stakeholders involved in the journey from lake to table. Furthermore, the platform will incorporate specific features that are designed to promote and track the adoption of sustainable fishing practices among fishermen, such as the ability to log fishing activities within permitted zones and the types of fishing gear that are being utilized. Finally, seamless communication tools will be embedded within the platform to enable direct interaction and coordination between all stakeholders, facilitating efficient transactions, fostering collaboration, and ensuring effective information sharing across the entire fish supply chain ecosystem.

**5. Platform Architecture and Module Breakdown: Building the Digital Infrastructure**



* 5.1. Proposed System Architecture: \
To ensure scalability, maintainability, and flexibility, a modular architecture, such as a microservices-based approach, is recommended for the platform. This architectural style allows different functionalities to be developed, deployed, and scaled independently. The core components of the system would include a user-facing Front-end, consisting of both a website for broader accessibility and dedicated mobile applications tailored for different user roles; a robust Back-end, housing the core application logic and providing APIs for communication between the front-end and other services; a reliable Database to securely store all platform data, including user information, product listings, order details, and tracking information; and integration with various external supporting services, such as secure payment gateways and mapping services for location-based features.
* **5.2. Key Modules:**
    * **5.2.1. User Management Module:** This module will handle all aspects of user accounts, including secure registration and authentication processes for each defined user role (fishermen, processors, etc.). It will also provide comprehensive profile management capabilities, allowing users to maintain their personal and business information relevant to their specific role within the fish supply chain. Crucially, this module will implement a granular Role-Based Access Control (RBAC) system to effectively manage user permissions and access levels to different features and data within the platform.
    * **5.2.2. Marketplace Module:** This core module will provide the essential functionalities for the buying and selling of fish products, fishing inputs, and potentially other related services. It will include features for managing product listings with detailed descriptions, pricing information, and availability status. Advanced search and filtering options will enable users to easily locate the products or services they require. A comprehensive order management system will handle the entire lifecycle of orders, from creation to tracking and status updates, ensuring all parties are informed. Seamless integration with secure payment gateways will support various payment methods relevant to the Kisumu region.<sup>4</sup> Additionally, inventory management features will be specifically designed for processing units and retailers to efficiently track their stock levels of both raw and processed fish products.
    * **5.2.3. Logistics and Tracking Module:** This module will be responsible for enabling real-time tracking of fish products throughout the supply chain. It will integrate with GPS technology, potentially leveraging the GPS capabilities of smartphones used by fishermen and distributors, as well as exploring the use of cost-effective IoT devices for tracking fish within processing units and during transportation.<sup>28</sup> The module will also include functionalities for managing dispatch and delivery operations, including the assignment of transportation and the tracking of delivery progress. Route optimization tools will assist distributors in planning efficient delivery routes, and integration with mapping services will allow for the visualization of tracked fish products and transportation routes.
    * **5.2.4. Sustainability and Traceability Module:** This module will focus on ensuring the responsible and transparent operation of the fish supply chain. It will incorporate data collection mechanisms to record crucial information about fishing practices, such as fishing locations, gear types, and catch details. The module will also facilitate the integration of relevant sustainability standards and certifications, allowing users to indicate their adherence and potentially verify their compliance. A robust batch tracking and tracing system will be implemented, enabling the complete history of a fish product to be traced back from the consumer to the specific fishing event.<sup>65</sup> Furthermore, the module will provide reporting functionalities to generate insights and reports on key sustainability metrics within the supply chain.
    * **5.2.5. Input Supply Module:** This module will create a dedicated space within the platform for suppliers of essential fishing inputs (nets, boats, bait, fuel, etc.) to list and showcase their products. It will include features for order placement and secure payment processing for these inputs. The module may also provide functionalities for managing supplier information and potentially their inventory levels.
    * **5.2.6. Data Analytics and Reporting Module:** This module will provide users with access to role-specific dashboards that visualize key data and performance indicators relevant to their operations. It will also enable the generation of customizable reports on various aspects of the supply chain, including sales trends, logistics performance, and sustainability metrics, empowering stakeholders to make data-driven decisions.
    * **5.2.7. Communication Module:** This module will facilitate seamless communication and collaboration among stakeholders. It will include a direct messaging system for secure and efficient one-on-one communication. Automated notifications and alerts will keep users informed about important events such as order updates and tracking information. Optionally, the module may also incorporate forum or community features to foster broader discussions, knowledge sharing, and collaboration among all platform users.<sup>79</sup>

**6. User Roles and Access Management: Tailoring the Digital Experience**



* 6.1. Defined User Roles: \
The platform will cater to a diverse set of users, each with specific needs and functionalities. Fishermen will primarily use the platform to list their daily or periodic fish catches, including species, quantity, location, and fishing methods. They will also be able to view current market prices for different fish types and potentially order fishing inputs. Access to weather information relevant to fishing activities can also be provided. Boat Owners/Fishing Guides will manage fishing trips, potentially assigning fishermen to specific trips, track overall catch data associated with their boats, and facilitate communication with fishermen. Processing Units will focus on sourcing raw fish from fishermen listed on the platform, managing their inventory of both raw and processed fish, listing their processed products (e.g., solar dried fish, fillets, smoked fish) for sale, and managing their distribution to retailers or other buyers. Distributors will primarily connect with processing units to procure processed fish, manage the logistics of transporting these products to various retailers and markets, and track the status of their shipments in real-time. Retailers will source fish from distributors or potentially directly from processors, manage their inventory of fish products, sell to end consumers through the platform or other channels, and track their sales data to better understand demand. End Consumers will primarily use the platform to view detailed information about the origin and sustainability of the fish they intend to purchase and may have the option to place orders directly with retailers or designated sellers. Input Suppliers will utilize the platform to list and sell essential fishing inputs such as nets, boats, bait, and fuel, directly reaching their target audience of fishermen and other stakeholders. Finally, the Platform Administrator will have the highest level of system access, responsible for managing all user accounts, configuring platform settings, overseeing data management, and potentially resolving any disputes that may arise between users.
* 6.2. Tailored Views and Functionalities: \
Each defined user role will be provided with a unique and intuitive interface within both the website and the mobile application. This tailored experience will ensure that users only have access to the specific modules and functionalities that are directly relevant to their particular needs and responsibilities within the fish supply chain. For instance, a fisherman's mobile app interface will prominently feature options for listing catches and viewing market prices, while a retailer's interface might focus on procurement options and inventory management tools. This role-specific design approach will streamline workflows, minimize clutter, and enhance the overall user experience by presenting only the necessary information and actions.
* 6.3. Role-Based Access Control (RBAC): \
To ensure the security and integrity of the platform and its data, a robust Role-Based Access Control (RBAC) system will be implemented.11 RBAC is a security mechanism that restricts system access to authorized users based on their assigned roles within the platform. This approach operates on the principle of least privilege, meaning that each user will only be granted the minimum level of permissions necessary to perform their specific tasks.85 For example, a fisherman will have permission to list their catches and view market data but will not have access to financial reports for processing units. Similarly, a distributor will be able to manage their shipments and view relevant inventory data but will not have the authority to modify user account settings. This granular control over access will be critical in a multi-stakeholder environment where different users will have varying levels of trust and distinct data access requirements, safeguarding sensitive information and preventing unauthorized modifications.
* 6.4. Insights for User Role Management: \
When designing the user interfaces and implementing access control mechanisms, it is crucial to carefully consider the diverse levels of digital literacy that may exist among the different user groups, particularly among fishermen and potentially smaller-scale processing units.92 To facilitate broader adoption and minimize the learning curve for users with limited prior experience with digital platforms, a tiered access system could be implemented. In this system, users with lower technical proficiency would initially be presented with a simplified interface that provides access to only the most essential core functionalities. Clear pathways, intuitive navigation, and readily available support resources would then guide these users as they gradually become more comfortable with the platform, allowing them to explore and utilize more advanced features as their digital skills and confidence improve over time. This gradual approach can significantly enhance user adoption by reducing the initial barrier to entry and providing a more manageable learning experience.

**7. Ensuring Sustainability and Traceability: Building a Responsible Ecosystem**



* 7.1. Tracking Fishing Practices: \
To promote sustainable fishing, the platform will integrate GPS tracking capabilities 98 directly into the mobile application used by fishermen. This will enable the automatic recording of the precise geographical location and the duration of their fishing activities on Lake Victoria. Additionally, the fishermen's app will feature user-friendly data entry fields, allowing them to easily log critical details about their catch, including the specific fish species harvested, the quantities caught (potentially by weight or count), and the types of fishing gear that were utilized during the fishing expedition. Furthermore, the feasibility of integrating the platform with existing or developing electronic catch reporting systems that may be mandated or voluntarily adopted by local fisheries authorities will be explored. This could streamline the reporting process for fishermen and provide valuable data for fisheries management and sustainability monitoring.
* 7.2. Integrating Sustainable Fishing Guidelines: \
The platform will incorporate a readily accessible and comprehensive library of information and resources on sustainable fishing practices that are specifically relevant to the ecological conditions and regulatory framework of Lake Victoria.45 This may include guidelines on permitted fishing zones, regulations regarding the types and sizes of fishing gear that can be used, and information on respecting established fishing quotas or seasonal restrictions designed to protect fish breeding cycles. The platform will also provide features that allow for the tracking of fishermen's adherence to these specific sustainable fishing practices. This could involve data input by the fishermen themselves, indicating their compliance with certain guidelines, and potentially the integration of verification mechanisms, such as allowing authorized fisheries officers or community monitors to validate the reported practices.
* 7.3. Product Traceability from Lake to Table: \
A robust system for product traceability will be implemented to ensure transparency throughout the fish supply chain. This will involve assigning unique and easily identifiable codes, such as QR codes printed on durable, water-resistant tags, to batches of fish immediately at the point of capture or landing. The feasibility of utilizing more advanced technologies like RFID tags 108 will also be explored, considering their cost-effectiveness and practicality within the local context. A clear protocol will be established for recording each transfer of custody of the fish as it moves through the various stages of the supply chain, from the fisherman to the processing unit, then to the distributor, and finally to the retailer. At each step of this journey, the unique identifier will be linked with accurate timestamps and precise location data, creating a detailed history of the fish product's movement. The potential of utilizing blockchain technology will be thoroughly investigated as a means to create an immutable, transparent, and auditable record of the entire journey of the fish product, from its origin in Lake Victoria all the way to the point of sale to the consumer.73 The decentralized and tamper-proof nature of blockchain can significantly enhance trust and transparency within the fish supply chain by providing an unalterable record of the product's history.73 This can be particularly valuable in verifying the authenticity of the fish's origin, confirming adherence to sustainable fishing practices, and ensuring the integrity of the product throughout the supply chain.
* 7.4. Consumer Transparency: \
To empower end consumers and provide them with greater confidence in the fish they purchase, the platform will offer a simple and user-friendly mechanism for accessing detailed information about the product's journey. This could involve allowing consumers to scan a QR code or similar identifier on the fish packaging using their mobile application. Upon scanning, consumers would be able to access comprehensive information about the specific fish product, including its precise origin (the general fishing location within Lake Victoria), the identity of the fishermen involved in its capture, and detailed information about the sustainability and handling practices that were followed throughout its journey from the lake to the retailer. This level of transparency will not only meet the growing consumer demand for information about food origins and sustainability but also help to build trust in the platform and the stakeholders participating in it.
* 7.5. Insights for Sustainability and Traceability: \
The selection and implementation of tracking technologies will prioritize cost-effectiveness and user-friendliness, ensuring that they are well-suited to the specific infrastructure limitations and operational realities of the local context in Kisumu.110 Given the potential challenges in remote areas, solutions that minimize the need for extensive infrastructure and are easy for users with varying levels of technical expertise to adopt will be favored. Furthermore, to incentivize the adoption of sustainable fishing practices and the accurate logging of traceability data, a gamified system could be considered. This system could reward fishermen and processing units for consistently adhering to established guidelines, potentially offering benefits such as preferential placement within the platform's marketplace or access to premium features, thereby encouraging responsible practices through positive reinforcement.

**8. Technology Framework and Recommendations: Powering the Platform**



* 8.1. Platform Development Technologies: \
For efficient development of both the website and the mobile applications, utilizing cross-platform mobile development frameworks such as React Native or Flutter is highly recommended.116 These frameworks allow developers to write code once and deploy it across multiple platforms (iOS and Android for mobile, and web browsers), significantly reducing development time and costs.
* 8.2. Database Management: \
A scalable and reliable database management system (DBMS) is crucial for handling the anticipated volume of data. Options such as PostgreSQL or MySQL are well-suited for this purpose, offering robust performance, scalability to accommodate future growth, and strong data integrity features.
* 8.3. Payment Gateway Integration: \
To facilitate secure and convenient transactions, the platform should integrate with multiple payment gateways. Prioritizing gateways that support popular mobile money payment systems widely used in the Kisumu region is essential for accessibility. Additionally, support for traditional payment methods like credit/debit cards and bank transfers should also be included to cater to a broader range of users.4
* 8.4. Real-time Tracking Technologies: \
Leveraging the widespread use of smartphones, integrating GPS tracking capabilities into the mobile applications for fishermen and distributors is a practical and cost-effective solution for real-time location monitoring.98 For tracking fish products within processing units and during transportation, a thorough exploration of the feasibility and cost-effectiveness of deploying low-power, wide-area network (LPWAN) IoT sensors is necessary.59 Technologies like NB-IoT or LoRaWAN offer long battery life and wider coverage, which can be advantageous in areas with limited infrastructure. These sensors can provide continuous and automated monitoring of location and potentially environmental conditions relevant to fish quality.59 However, challenges related to reliable connectivity and power availability in remote fishing areas must be carefully considered.118 Finally, a detailed evaluation of the applicability and cost implications of integrating blockchain technology for enhanced and immutable traceability of fish products throughout the entire supply chain should be conducted.73
* 8.5. Cost-Effective Solutions for Developing Countries: \
Given the context of a developing country like Kenya, prioritizing technology solutions that are not only effective but also affordable, require minimal complex infrastructure, and are relatively easy to implement and maintain is paramount.110 Leveraging open-source GPS tracking software solutions 112 and focusing on mobile-based tracking systems 124 that utilize the existing prevalence of mobile phone usage among stakeholders can be highly cost-effective strategies, minimizing the need for significant upfront investment in specialized hardware for all users.
* 8.6. Insights for Technology Recommendations: \
The recommended technology solutions should be robust and reliable, even in areas with potentially limited or intermittent internet connectivity. Careful consideration must be given to the level of technical skills and resources that are likely to be available for the initial implementation, ongoing maintenance, and future scalability of the chosen technologies within the local context of Kisumu.

**9. Driving Adoption: Incentivizing Stakeholder Participation**



* 9.1. Economic Incentives: \
Participation in the platform will offer significant economic incentives for all stakeholders. Fishermen will gain access to a wider market, potentially leading to more competitive prices and increased income for their catch.6 They can also benefit from reduced operational costs through access to a marketplace for more affordable fishing inputs. Processing Units will gain a more efficient and reliable way to source raw fish directly from fishermen, streamline their inventory management, and access a larger network of distributors and retailers. Distributors will be able to connect with more processing units and retailers, optimize their logistics for reduced transportation costs, and gain better visibility into market demand. Retailers will benefit from a more consistent and reliable supply of quality fish, potentially gain access to valuable data on consumer preferences, and streamline their procurement processes. Input Suppliers will have direct access to their target market of fishermen and other stakeholders, potentially increasing their sales volume and market reach.
* 9.2. Gamification and Rewards: \
To further encourage engagement, a points-based system can be implemented where stakeholders earn points for active participation on the platform (listing catches, fulfilling orders, providing ratings), for adhering to quality standards, and for adopting sustainable practices. These points can then be redeemed for various benefits, such as discounts on platform fees, access to premium features, or even monetary rewards.130 Additionally, digital badges and public recognition within the platform can be offered to top-performing stakeholders or those who consistently demonstrate a strong commitment to sustainability and traceability.130
* 9.3. Access to Information and Resources: \
Providing all stakeholders with access to real-time market prices for different fish species and product forms will empower them to make more informed trading decisions. The platform will also offer readily available educational resources, best practice guides, and training materials on sustainable fishing techniques, efficient fish processing and handling methods, and emerging market trends. Sharing aggregated and anonymized data and insights on overall market trends, consumer demand patterns, and potential opportunities within the fish supply chain will further incentivize participation by providing valuable knowledge for business growth.
* 9.4. Community Building: \
Facilitating the creation of online forums, discussion groups, or other community features within the platform will encourage interaction, knowledge sharing, and collaboration among all registered stakeholders.79 This sense of community can foster trust, facilitate problem-solving, and encourage greater participation in the platform's ecosystem.
* 9.5. User Adoption Strategies: \
A seamless and intuitive onboarding process will be critical for driving initial user adoption. This should include clear step-by-step tutorials, helpful guides, and readily accessible support resources for all user roles.135 Ongoing training programs and dedicated support channels will also be essential to ensure that all stakeholders, regardless of their technical proficiency, can effectively utilize the platform's features and functionalities. Regularly collecting user feedback and actively engaging with the community to continuously iterate on the platform's design and features based on their evolving needs and experiences will further enhance adoption and user satisfaction.
* 9.6. Insights for Incentivizing Participation: \
The proposed incentives must be carefully tailored to align with the specific motivations, needs, and priorities of each distinct stakeholder group within the Kisumu fish supply chain.130 Additionally, exploring the potential for the platform to facilitate access to micro-loans or other financial services for fishermen and small-scale processing units, potentially through strategic partnerships with local financial institutions, could serve as a significant incentive for platform adoption and overall business growth, addressing a critical need often faced by small-scale operators in developing economies.

**10. Designing for Intuitive User Experience: Empowering All Stakeholders**



* 10.1. UI/UX Principles for Diverse Users: \
The user interface and user experience design will prioritize simplicity and clarity, minimizing cognitive load to ensure ease of navigation for users with varying levels of digital literacy.92 Clear, concise, and straightforward language will be used throughout the platform, avoiding technical jargon and employing familiar terminology.92 A high degree of consistency in design patterns, visual elements, and navigation will be maintained across both the website and the mobile applications to create a predictable and user-friendly environment.116 Adherence to accessibility best practices will be paramount to accommodate users with diverse abilities, including visual, auditory, motor, and cognitive impairments.93 An inclusive design approach will be adopted, considering cultural diversity, varying levels of technical proficiency, and the unique needs and preferences of all stakeholders.94
* 10.2. Mobile App Design Best Practices for Developing Countries: \
The mobile applications will be optimized for efficient performance in environments with potentially low bandwidth and intermittent internet connectivity.170 User interfaces will be specifically tailored for smaller mobile screen sizes and intuitive touch-based interactions.157 The display of essential content and core functionalities will be prioritized, avoiding unnecessary clutter.172 Common and easily recognizable gestures will be incorporated for navigation and key actions within the mobile apps.157
* 10.3. Website Design Best Practices for Diverse Audiences: \
The website design will ensure clear and intuitive navigation, enabling users to easily find necessary information and functionalities, with prominent and understandable calls to action.166 Content will be structured logically using clear headings, subheadings, and bullet points to enhance readability and comprehension for users with diverse cognitive abilities.163 High-contrast color combinations for text and background elements, along with legible font styles and sizes, will be used to improve readability for users with visual impairments.158 Descriptive alternative text will be provided for all images and multimedia elements to ensure accessibility for users who rely on screen readers.163
* 10.4. Examples of User-Friendly Supply Chain Platforms: \
Research into existing supply chain management software and e-commerce platforms recognized for their user-friendly interfaces and intuitive design will provide valuable inspiration for best practices.176 Analyzing the design patterns and user flows of successful platforms in similar domains can inform the development of an intuitive and effective user experience for the Kisumu fish supply chain platform.
* 10.5. Insights for UI/UX Design: \
Thorough user research involving representatives from each defined stakeholder group will be conducted to gain a deep understanding of their specific needs, preferences, workflows, and levels of technical comfort.154 An iterative design approach will be adopted, with continuous gathering of user feedback and usability testing throughout the development process to identify areas for improvement and ensure the platform effectively meets the needs of its diverse user base.156 Furthermore, implementing robust multilingual support within both the website and the mobile applications will be crucial to effectively cater to the linguistic diversity of the Kisumu region, significantly improving accessibility and user adoption among all stakeholders. Providing the platform in local languages will lower the barrier to entry for many users and enhance their overall experience.

**11. Conclusion and Recommendations: Charting the Course for Digital Transformation**

The proposed multifunctional digital platform presents a significant opportunity to revolutionize the fish supply chain in the Kisumu region. By seamlessly integrating a robust marketplace inspired by Alibaba with the operational efficiency and real-time tracking capabilities of Uber, this platform has the potential to create a transparent, efficient, sustainable, and economically beneficial ecosystem for all stakeholders involved. It offers the promise of enhanced sustainability through the tracking of fishing practices and the promotion of responsible guidelines, improved traceability from lake to table using innovative technologies, increased efficiency in logistics and transactions, and significant economic advantages for local fishermen, processors, distributors, retailers, and input suppliers.

For successful development and implementation, a phased approach is recommended, starting with core marketplace and tracking functionalities and gradually incorporating more advanced features like blockchain integration and financial services. Strategic partnerships with local community organizations, government agencies, and financial institutions will be crucial for building trust and facilitating adoption. Critical success factors will include consistent engagement with all stakeholder groups throughout the development process, ensuring a reliable technological infrastructure even in areas with limited connectivity, and providing ongoing training and support to empower users of all technical skill levels. Potential challenges, such as resistance to adopting new technologies and ensuring data accuracy from all users, should be addressed proactively through comprehensive training programs, clear communication of benefits, and the implementation of user-friendly interfaces.

By embracing this digital transformation, the Kisumu fish supply chain can unlock its full potential, contributing to a more sustainable, resilient, and prosperous future for the local economy and the communities that depend on it.

**Key Tables:**

**Table 1: User Roles and Permissions Matrix (Example)**


<table>
  <tr>
   <td><strong>User Role</strong>
   </td>
   <td><strong>Marketplace - View Listings</strong>
   </td>
   <td><strong>Marketplace - Create Listings</strong>
   </td>
   <td><strong>Logistics - Track Shipments</strong>
   </td>
   <td><strong>Sustainability - Log Catch Data</strong>
   </td>
   <td><strong>Input Supply - View Listings</strong>
   </td>
   <td><strong>Input Supply - Create Listings</strong>
   </td>
   <td><strong>Data Analytics - View Reports</strong>
   </td>
   <td><strong>Communication - Send Messages</strong>
   </td>
  </tr>
  <tr>
   <td>Fisherman
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes (Limited)
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Boat Owner/Guide
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes (Limited)
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Processing Unit
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Distributor
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Retailer
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>End Consumer
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>Yes (Limited)
   </td>
   <td>No
   </td>
   <td>No
   </td>
   <td>No
   </td>
   <td>No
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>Input Supplier
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>No
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes (Limited)
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>Platform Administrator
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
</table>


**Table 2: Recommended Technology Stack**


<table>
  <tr>
   <td><strong>Platform Component</strong>
   </td>
   <td><strong>Recommended Technology</strong>
   </td>
   <td><strong>Justification</strong>
   </td>
  </tr>
  <tr>
   <td>Front-end Development
   </td>
   <td>React Native
   </td>
   <td>Enables cross-platform development (iOS, Android, Web) for efficiency and cost-effectiveness.
   </td>
  </tr>
  <tr>
   <td>Back-end Development
   </td>
   <td>Node.js
   </td>
   <td>Scalable, event-driven, and widely used for building APIs, with a large community and extensive libraries.
   </td>
  </tr>
  <tr>
   <td>Database
   </td>
   <td>PostgreSQL
   </td>
   <td>Robust, reliable, and scalable open-source relational database, suitable for handling complex data relationships.
   </td>
  </tr>
  <tr>
   <td>Payment Gateway
   </td>
   <td>Mobile Money APIs (e.g., M-Pesa), Traditional Payment Gateways
   </td>
   <td>Ensures accessibility for a wide range of users in the region, supporting both prevalent mobile payments and traditional methods.
   </td>
  </tr>
  <tr>
   <td>Real-time Tracking - Fishermen
   </td>
   <td>Smartphone GPS
   </td>
   <td>Leverages the existing widespread use of smartphones among fishermen for cost-effective location tracking.
   </td>
  </tr>
  <tr>
   <td>Real-time Tracking - Processing/Transport
   </td>
   <td>LPWAN IoT Sensors (Explore NB-IoT/LoRaWAN)
   </td>
   <td>Offers potential for low-power, wide-area coverage for tracking assets in transit and within facilities. Requires careful feasibility assessment.
   </td>
  </tr>
  <tr>
   <td>Traceability (Optional)
   </td>
   <td>Blockchain (e.g., Hyperledger Fabric)
   </td>
   <td>Provides an immutable and transparent ledger for enhanced trust and verification of fish origin and handling. Requires careful evaluation of complexity and cost.
   </td>
  </tr>
</table>


**Table 3: Stakeholder-Specific Incentives**

| Stakeholder Group | Economic Incentives | Non-Economic Incentives


#### Works cited



1. IMPROVING FOOD SUSTAINABILITY IN THE FISH AND AGRI-FOOD VALUE CHAINS IN WESTERN KENYA THROUGH SOLAR COOLING SOLUTIONS - GIZ, accessed April 13, 2025, [https://www.giz.de/en/downloads/giz2024-en-east-africa-WeTu-report.pdf](https://www.giz.de/en/downloads/giz2024-en-east-africa-WeTu-report.pdf)
2. THE FISH INDUSTRY: POSITIONING FOR THE FUTURE IN THE FACE OF COVID-19, accessed April 13, 2025, [https://tegemeo.egerton.ac.ke/n/news-notices/covid-19-news-updates/the-fish-industry](https://tegemeo.egerton.ac.ke/n/news-notices/covid-19-news-updates/the-fish-industry)
3. Lake Victoria - African Center for Aquatic Research and Education, accessed April 13, 2025, [https://www.agl-acare.org/lake-victoria](https://www.agl-acare.org/lake-victoria)
4. Exploring Alibaba Online Marketplace - Powerhouse of Ecommerce 2024 - Oyelabs, accessed April 13, 2025, [https://oyelabs.com/exploring-alibaba-online-marketplace/](https://oyelabs.com/exploring-alibaba-online-marketplace/)
5. Alibaba.com B2B E-Commerce Explained: Everything You Need To Know -, accessed April 13, 2025, [https://reads.alibaba.com/alibaba-com-b2b-e-commerce-explained-everything-you-need-to-know/](https://reads.alibaba.com/alibaba-com-b2b-e-commerce-explained-everything-you-need-to-know/)
6. What is Alibaba? Everything You Should Know, accessed April 13, 2025, [https://seller.alibaba.com/businessblogs/what-is-alibaba-everything-you-should-know-px002ar9z](https://seller.alibaba.com/businessblogs/what-is-alibaba-everything-you-should-know-px002ar9z)
7. Ecommerce Management: A Comprehensive Guide - Alibaba Seller, accessed April 13, 2025, [https://seller.alibaba.com/businessblogs/ecommerce-management-a-comprehensive-guide---alibaba-seller-px0029d5x](https://seller.alibaba.com/businessblogs/ecommerce-management-a-comprehensive-guide---alibaba-seller-px0029d5x)
8. Alibaba Business Model: How Does Alibaba Make Money? - Yo!Kart, accessed April 13, 2025, [https://www.yo-kart.com/blog/how-does-alibaba-makes-money/](https://www.yo-kart.com/blog/how-does-alibaba-makes-money/)
9. Alibaba B2B Tool Suite and Features for Sellers, accessed April 13, 2025, [https://seller.alibaba.com/features](https://seller.alibaba.com/features)
10. How Sourcing on Alibaba.com Works, accessed April 13, 2025, [https://buyer.alibaba.com/page/how_it_wroks.html](https://buyer.alibaba.com/page/how_it_wroks.html)
11. 10 Essential Features To Look for in B2B eCommerce Software - - Alibaba.com Reads, accessed April 13, 2025, [https://reads.alibaba.com/10-essential-features-to-look-for-in-b2b-ecommerce-software/](https://reads.alibaba.com/10-essential-features-to-look-for-in-b2b-ecommerce-software/)
12. How to Pay for Goods on Alibaba.com Quickly, Easily, and Securely -, accessed April 13, 2025, [https://reads.alibaba.com/how-to-pay-for-goods-on-alibaba-com-quickly-easily-and-securely/](https://reads.alibaba.com/how-to-pay-for-goods-on-alibaba-com-quickly-easily-and-securely/)
13. Manufacturers, Suppliers, Exporters & Importers from the world's largest online B2B marketplace-Alibaba.com, accessed April 13, 2025, [https://cashier.alibaba.com/payment/pricingTable.htm](https://cashier.alibaba.com/payment/pricingTable.htm)
14. How to Make a Payment on Alibaba: Is It Safe?, accessed April 13, 2025, [https://seller.alibaba.com/businessblogs/how-to-make-a-payment-on-alibaba-is-it-safe-px002blab](https://seller.alibaba.com/businessblogs/how-to-make-a-payment-on-alibaba-is-it-safe-px002blab)
15. Safe & easy payments - Trade Assurance protects your Alibaba.com orders, accessed April 13, 2025, [https://tradeassurance.alibaba.com/ta/Payment.htm](https://tradeassurance.alibaba.com/ta/Payment.htm)
16. ordering & payments - Alibaba, accessed April 13, 2025, [https://activity.alibaba.com/helpcenter/000c6827.html](https://activity.alibaba.com/helpcenter/000c6827.html)
17. A Comprehensive Guide to Alibaba.com Ordering: From A to Z -, accessed April 13, 2025, [https://reads.alibaba.com/comprehensive-guide-to-alibaba-com-ordering-from-a-to-z/](https://reads.alibaba.com/comprehensive-guide-to-alibaba-com-ordering-from-a-to-z/)
18. Shipping & logistics services - Trade Assurance protects your Alibaba.com orders, accessed April 13, 2025, [https://tradeassurance.alibaba.com/ta/shippingandlogistics.htm](https://tradeassurance.alibaba.com/ta/shippingandlogistics.htm)
19. Alibaba Logistics - Reliable Sea and Air Solutions, accessed April 13, 2025, [https://www.alibaba.com/showroom/alibaba-logistics.html](https://www.alibaba.com/showroom/alibaba-logistics.html)
20. A Guide to Alibaba.com Logistics Marketplace Door-To-Door Service - - Alibaba.com Reads, accessed April 13, 2025, [https://reads.alibaba.com/guide-to-alibaba-com-logistics-marketplace-door-to-door-service/](https://reads.alibaba.com/guide-to-alibaba-com-logistics-marketplace-door-to-door-service/)
21. How To Use Alibaba.com Logistics Marketplace -, accessed April 13, 2025, [https://reads.alibaba.com/how-to-use-alibaba-com-logistics-marketplace/](https://reads.alibaba.com/how-to-use-alibaba-com-logistics-marketplace/)
22. Alibaba.com Privacy Policy, accessed April 13, 2025, [https://rule.alibaba.com/rule/detail/2034.htm](https://rule.alibaba.com/rule/detail/2034.htm)
23. Sell on Alibaba.com, accessed April 13, 2025, [https://seller.alibaba.com/us](https://seller.alibaba.com/us)
24. Platform For AI:Appendix: Roles and permissions - Alibaba Cloud, accessed April 13, 2025, [https://www.alibabacloud.com/help/en/pai/appendix-list-of-roles-and-permissions](https://www.alibabacloud.com/help/en/pai/appendix-list-of-roles-and-permissions)
25. Microsoft Entra single sign-on (SSO) integration with Alibaba Cloud Service (Role-based SSO), accessed April 13, 2025, [https://learn.microsoft.com/en-us/entra/identity/saas-apps/alibaba-cloud-service-role-based-sso-tutorial](https://learn.microsoft.com/en-us/entra/identity/saas-apps/alibaba-cloud-service-role-based-sso-tutorial)
26. Overview of users, roles, and permissions - Alibaba Cloud, accessed April 13, 2025, [https://www.alibabacloud.com/help/en/dataworks/overview-permission-management-on-service-modules](https://www.alibabacloud.com/help/en/dataworks/overview-permission-management-on-service-modules)
27. www.yo-kart.com, accessed April 13, 2025, [https://www.yo-kart.com/blog/how-does-alibaba-makes-money/#:~:text=Unlike%20eBay%20and%20Amazon%20where,range%20of%20products%20and%20services.](https://www.yo-kart.com/blog/how-does-alibaba-makes-money/#:~:text=Unlike%20eBay%20and%20Amazon%20where,range%20of%20products%20and%20services.)
28. Must-Have Uber App Features: Building a Ridesharing App - Addevice, accessed April 13, 2025, [https://www.addevice.io/blog/uber-app-features](https://www.addevice.io/blog/uber-app-features)
29. A Complete Guide to Essential Uber App Features - Codeflash Infotech, accessed April 13, 2025, [https://codeflashinfotech.com/guide-to-essential-uber-app-features/](https://codeflashinfotech.com/guide-to-essential-uber-app-features/)
30. Tracking your route as a customer | Driving & Delivering - Uber Help, accessed April 13, 2025, [https://help.uber.com/driving-and-delivering/article/tracking-your-route-as-a-customer?nodeId=94883a31-8de1-4faf-b0fa-877caf917375](https://help.uber.com/driving-and-delivering/article/tracking-your-route-as-a-customer?nodeId=94883a31-8de1-4faf-b0fa-877caf917375)
31. Delivering Uber-Like Experiences for Your B2B Asset Tracking Needs, accessed April 13, 2025, [https://innovations.woolpert.com/delivering-uber-like-experiences-for-your-b2b-asset-tracking-needs/](https://innovations.woolpert.com/delivering-uber-like-experiences-for-your-b2b-asset-tracking-needs/)
32. How does Uber/Lyft continuously track drivers and their locations relative to the user searching for a ride? - Reddit, accessed April 13, 2025, [https://www.reddit.com/r/howdidtheycodeit/comments/pysidd/how_does_uberlyft_continuously_track_drivers_and/](https://www.reddit.com/r/howdidtheycodeit/comments/pysidd/how_does_uberlyft_continuously_track_drivers_and/)
33. Uber's Real-Time Push Platform | Uber Blog, accessed April 13, 2025, [https://www.uber.com/blog/real-time-push-platform/](https://www.uber.com/blog/real-time-push-platform/)
34. 3 - Learn how to use the Driver App | Driving & Delivering - Uber Help, accessed April 13, 2025, [https://help.uber.com/driving-and-delivering/article/3---learn-how-to-use-the-driver-app?nodeId=8b30c1f5-91f4-40c5-838f-2037bb0ca95e](https://help.uber.com/driving-and-delivering/article/3---learn-how-to-use-the-driver-app?nodeId=8b30c1f5-91f4-40c5-838f-2037bb0ca95e)
35. What Is Uber and How Do You Use it?, accessed April 13, 2025, [https://www.uber.com/us/en/ride/how-it-works/](https://www.uber.com/us/en/ride/how-it-works/)
36. Uber driver app navigation features | Driving & Delivering, accessed April 13, 2025, [https://help.uber.com/driving-and-delivering/article/uber-driver-app-navigation-features?nodeId=357c291a-9b6e-45e9-9614-aea820f089ce](https://help.uber.com/driving-and-delivering/article/uber-driver-app-navigation-features?nodeId=357c291a-9b6e-45e9-9614-aea820f089ce)
37. Uber - Driver: Drive & Deliver on the App Store, accessed April 13, 2025, [https://apps.apple.com/us/app/uber-driver-drive-deliver/id1131342792](https://apps.apple.com/us/app/uber-driver-drive-deliver/id1131342792)
38. Uber - Driver: Drive & Deliver - Apps on Google Play, accessed April 13, 2025, [https://play.google.com/store/apps/details?id=com.ubercab.driver](https://play.google.com/store/apps/details?id=com.ubercab.driver)
39. Download the New Uber Driver App | Uber, accessed April 13, 2025, [https://www.uber.com/us/en/drive/driver-app/](https://www.uber.com/us/en/drive/driver-app/)
40. Top 12 Must Know Uber App Features For Similar Development - Moon Technolabs, accessed April 13, 2025, [https://www.moontechnolabs.com/blog/uber-app-features/](https://www.moontechnolabs.com/blog/uber-app-features/)
41. Uber In-app Safety Features for Riders, accessed April 13, 2025, [https://www.uber.com/br/en/ride/safety/rider-safety-features/](https://www.uber.com/br/en/ride/safety/rider-safety-features/)
42. Uber introduces new features to elevate safety | Uber Newsroom, accessed April 13, 2025, [https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety/](https://www.uber.com/en-IN/newsroom/uber-introduces-new-features-to-elevate-safety/)
43. Caged Fish Value Chain, Lake Victoria, Kisumu, Kenya - Global Partnerships, accessed April 13, 2025, [https://global-partnerships.uq.edu.au/blog/2020/11/caged-fish-value-chain-lake-victoria-kisumu-kenya](https://global-partnerships.uq.edu.au/blog/2020/11/caged-fish-value-chain-lake-victoria-kisumu-kenya)
44. Lake Victoria Tilapia: Stakeholders call for sustainable fisheries - Seafood Media Group - Worldnews, accessed April 13, 2025, [https://seafood.media/fis/worldnews/worldnews.asp?monthyear=11-2024&day=25&id=132743&l=e&country=82&special=&ndb=1&df=0](https://seafood.media/fis/worldnews/worldnews.asp?monthyear=11-2024&day=25&id=132743&l=e&country=82&special&ndb=1&df=0)
45. Lake Victoria Fishing - Turkana Wildlife Safaris, accessed April 13, 2025, [https://turkanawildlifesafaris.com/lake-victoria-fishing/](https://turkanawildlifesafaris.com/lake-victoria-fishing/)
46. Aquaculture comes to Lake Victoria, but will it help wild fish? - Mongabay, accessed April 13, 2025, [https://news.mongabay.com/2016/02/aquaculture-comes-to-lake-victoria-but-will-it-help-wild-fish/](https://news.mongabay.com/2016/02/aquaculture-comes-to-lake-victoria-but-will-it-help-wild-fish/)
47. (PDF) An overview of the current status of Lake Victoria fishery: Opportunities, challenges and management strategies - ResearchGate, accessed April 13, 2025, [https://www.researchgate.net/publication/229900103_An_overview_of_the_current_status_of_Lake_Victoria_fishery_Opportunities_challenges_and_management_strategies](https://www.researchgate.net/publication/229900103_An_overview_of_the_current_status_of_Lake_Victoria_fishery_Opportunities_challenges_and_management_strategies)
48. Lake Victoria fishing industry declines, spurring Gulf migration - Al Jazeera, accessed April 13, 2025, [https://www.aljazeera.com/gallery/2021/11/8/kenya-lake-victoria-fishing-industry-declines-spurring-gulf-migration](https://www.aljazeera.com/gallery/2021/11/8/kenya-lake-victoria-fishing-industry-declines-spurring-gulf-migration)
49. Mind the gaps for the best practices: Enhancing the management of Lake Victoria fisheries resources - UNL Digital Commons, accessed April 13, 2025, [https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=2567&context=natrespapers](https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=2567&context=natrespapers)
50. A Taskforce Approach for Sustainable Fisheries Management of Lake Victoria | AGLI, accessed April 13, 2025, [https://www.africangreatlakesinform.org/project/taskforce-approach-sustainable-fisheries-management-lake-victoria](https://www.africangreatlakesinform.org/project/taskforce-approach-sustainable-fisheries-management-lake-victoria)
51. Sustainable Fishing Technologies - Lake Victoria Small Fish Project, accessed April 13, 2025, [https://lvsfp.lvfo.org/portfolio/sustainable-fishing-technologies-2/](https://lvsfp.lvfo.org/portfolio/sustainable-fishing-technologies-2/)
52. A review of fish supply–demand in Tanzania - WorldFish Digital Repository, accessed April 13, 2025, [https://digitalarchive.worldfishcenter.org/bitstreams/8f0e2912-269e-46e2-9c74-a38ba3778bc3/download](https://digitalarchive.worldfishcenter.org/bitstreams/8f0e2912-269e-46e2-9c74-a38ba3778bc3/download)
53. Fish farming is rebuilding livelihoods and resilience in Kenya's Kisumu County - What's new, accessed April 13, 2025, [https://www.fao.org/fishery/en/news/41389](https://www.fao.org/fishery/en/news/41389)
54. Lake Victoria Fisheries Organization: East African Community, accessed April 13, 2025, [https://www.lvfo.org/](https://www.lvfo.org/)
55. Development of a Value Chain Module to Map Lake Victoria Small Fish Flows, Price Changes and Climate Risk at Ciala Resort Kisumu-Kenya from 25th To 27th September 2023 | East African Community, accessed April 13, 2025, [https://www.lvfo.org/content/development-value-chain-module-map-lake-victoria-small-fish-flows-price-changes-and-climate](https://www.lvfo.org/content/development-value-chain-module-map-lake-victoria-small-fish-flows-price-changes-and-climate)
56. regional guidelines for fisheries co-management on lake victoria, accessed April 13, 2025, [https://lvfo.org/sites/default/files/field/REGIONAL%20GUIDELINES%20FOR%20CO-MANAGEMENT%20ON%20LAKE%20VICTORIA.pdf](https://lvfo.org/sites/default/files/field/REGIONAL%20GUIDELINES%20FOR%20CO-MANAGEMENT%20ON%20LAKE%20VICTORIA.pdf)
57. Key stakeholders met to discuss degradation problems of Lake Victoria | EfD - Initiative, accessed April 13, 2025, [https://www.efdinitiative.org/news/key-stakeholders-met-discuss-degradation-problems-lake-victoria](https://www.efdinitiative.org/news/key-stakeholders-met-discuss-degradation-problems-lake-victoria)
58. management in Lake Victoria, Kenya - Deep Blue Repositories, accessed April 13, 2025, [https://deepblue.lib.umich.edu/bitstream/handle/2027.42/113679/lre12095_am.pdf?sequence=2&isAllowed=y](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/113679/lre12095_am.pdf?sequence=2&isAllowed=y)
59. IoT at Sea: Exploring a breadth of maritime applications - Saft Batteries, accessed April 13, 2025, [https://saft.com/en/energizing-iot/iot-sea-exploring-breadth-maritime-applications](https://saft.com/en/energizing-iot/iot-sea-exploring-breadth-maritime-applications)
60. Small-scale sustainable fishing: Space IoT for authorities - Kinéis, accessed April 13, 2025, [https://www.kineis.com/en/small-scale-sustainable-fishing-space-iot-for-the-benefit-of-authorities/](https://www.kineis.com/en/small-scale-sustainable-fishing-space-iot-for-the-benefit-of-authorities/)
61. Artificial Intelligence and Its Aquaculture Applications - environment coastal & offshore, accessed April 13, 2025, [https://ecomagazine.com/news/fisheries-aquaculture/artificial-intelligence-and-its-aquaculture-applications/](https://ecomagazine.com/news/fisheries-aquaculture/artificial-intelligence-and-its-aquaculture-applications/)
62. IoT in Aquaculture: Optimising Fish Farming Operations - EpiSensor.com, accessed April 13, 2025, [https://episensor.com/knowledge-base/iot-in-aquaculture-optimising-fish-farming-operations/](https://episensor.com/knowledge-base/iot-in-aquaculture-optimising-fish-farming-operations/)
63. 5 Ways IoT and AI Are Changing Fisheries and Aquaculture | IoT For All, accessed April 13, 2025, [https://www.iotforall.com/5-ways-iot-and-ai-are-changing-fisheries-and-aquaculture](https://www.iotforall.com/5-ways-iot-and-ai-are-changing-fisheries-and-aquaculture)
64. IoT is Helping the Fishing Industry Reel in Bigger Catches - iot2market, accessed April 13, 2025, [https://www.iot2market.com/newsView/iot-is-helping-the-fishing-industry-reel-in-bigger-catches](https://www.iot2market.com/newsView/iot-is-helping-the-fishing-industry-reel-in-bigger-catches)
65. LAKE VICTORIA FISHERIES INDUSTRIALISATION: RECENT DEVELOPMENTS IN UGANDA - Food and Agriculture Organization of the United Nations, accessed April 13, 2025, [https://www.fao.org/4/ad136e/ad136e01.htm](https://www.fao.org/4/ad136e/ad136e01.htm)
66. Assessment of the Nile Perch Fishery in Lake Victoria - GOV.UK, accessed April 13, 2025, [https://assets.publishing.service.gov.uk/media/57a08dc3ed915d3cfd001bcc/R4683b.pdf](https://assets.publishing.service.gov.uk/media/57a08dc3ed915d3cfd001bcc/R4683b.pdf)
67. Vanishing splendor: a comprehensive review of the decline in the original fish fauna of Lake Victoria - Dialnet, accessed April 13, 2025, [https://dialnet.unirioja.es/descarga/articulo/9207496.pdf](https://dialnet.unirioja.es/descarga/articulo/9207496.pdf)
68. Guidance document: Advancing end-to-end traceability | FAO, accessed April 13, 2025, [https://www.fao.org/family-farming/detail/en/c/1640146/](https://www.fao.org/family-farming/detail/en/c/1640146/)
69. THE NILE PERCH IN LAKE VICTORIA: LOCAL RESPONSES AND ADAPTATIONS, accessed April 13, 2025, [https://pringle.princeton.edu/wp-content/uploads/sites/798/2020/10/2005_Pringle-Africa.pdf](https://pringle.princeton.edu/wp-content/uploads/sites/798/2020/10/2005_Pringle-Africa.pdf)
70. Lake Victoria Fisheries Resources: Research and Management in Tanzania - ResearchGate, accessed April 13, 2025, [https://www.researchgate.net/publication/321339649_Lake_Victoria_Fisheries_Resources_Research_and_Management_in_Tanzania](https://www.researchgate.net/publication/321339649_Lake_Victoria_Fisheries_Resources_Research_and_Management_in_Tanzania)
71. Developing a traceability system for fish factories in Iceland and Tanzania, accessed April 13, 2025, [https://www.grocentre.is/static/gro/publication/44/document/eileen06prf.pdf](https://www.grocentre.is/static/gro/publication/44/document/eileen06prf.pdf)
72. Traceability And Quality Management In The Fishing Industry: A Case Study Of Kenya Marine And Fisheries Research Institute (Kisu - Uon Digital Repository, accessed April 13, 2025, [https://erepository.uonbi.ac.ke/bitstream/handle/11295/12649/ABSTRACT.pdf?sequence=3](https://erepository.uonbi.ac.ke/bitstream/handle/11295/12649/ABSTRACT.pdf?sequence=3)
73. Blockchain for Seafood: Ensuring Transparency and Traceability, accessed April 13, 2025, [https://agritimes.co.in/blockchain-for-seafood-ensuring-transparency-and-traceability/](https://agritimes.co.in/blockchain-for-seafood-ensuring-transparency-and-traceability/)
74. Blockchain for Seafood Traceability: Addressing Challenges and Unlocking Opportunities, accessed April 13, 2025, [https://sea2see.eu/blockchain-for-seafood-traceability-addressing-challenges-and-unlocking-opportunities/](https://sea2see.eu/blockchain-for-seafood-traceability-addressing-challenges-and-unlocking-opportunities/)
75. Revolutionizing Seafood Traceability: How Blockchain is Leading the Way - TransGenie, accessed April 13, 2025, [https://www.transgenie.io/blockchain-traceability-system-in-aquaculture-supply-chain](https://www.transgenie.io/blockchain-traceability-system-in-aquaculture-supply-chain)
76. Seafood Value Chain - Blockchain for Food Safety, Traceability and Supplychain Transparency - TraceX, accessed April 13, 2025, [https://tracextech.com/seafood-value-chain/](https://tracextech.com/seafood-value-chain/)
77. Seafood is off the Chain! How do we integrate Blockchain Technology for Seafood Traceability? - eScholarship.org, accessed April 13, 2025, [https://escholarship.org/uc/item/4385m32n](https://escholarship.org/uc/item/4385m32n)
78. Full article: Blockchain-enabled traceability system for the sustainable seafood industry, accessed April 13, 2025, [https://www.tandfonline.com/doi/full/10.1080/09537325.2023.2233632](https://www.tandfonline.com/doi/full/10.1080/09537325.2023.2233632)
79. 10 Strategies For Building A Strong Online Community Around Your Brand - Forbes, accessed April 13, 2025, [https://www.forbes.com/councils/forbesbusinesscouncil/2024/08/19/10-strategies-for-building-a-strong-online-community-around-your-brand/](https://www.forbes.com/councils/forbesbusinesscouncil/2024/08/19/10-strategies-for-building-a-strong-online-community-around-your-brand/)
80. How to Build Online Communities for Better Engagement - Arena.im, accessed April 13, 2025, [https://arena.im/online-communities/how-to-build-online-communities/](https://arena.im/online-communities/how-to-build-online-communities/)
81. 12 Best Online Community Platforms in 2025 (Pros and Cons) - WPBeginner, accessed April 13, 2025, [https://www.wpbeginner.com/showcase/best-online-community-platforms/](https://www.wpbeginner.com/showcase/best-online-community-platforms/)
82. 10 Critical Mistakes to Avoid in Online Community Building | Bettermode Guide, accessed April 13, 2025, [https://bettermode.com/blog/10-common-mistakes-to-avoid-when-building-online-communities](https://bettermode.com/blog/10-common-mistakes-to-avoid-when-building-online-communities)
83. 9 Best Community Platforms In 2025 (I've Tested Them All) - LinoDash, accessed April 13, 2025, [https://www.linodash.com/community-platforms/](https://www.linodash.com/community-platforms/)
84. How to Build a Successful Online Community: A Step-by-Step Guide - HubSpot Blog, accessed April 13, 2025, [https://blog.hubspot.com/marketing/online-community-launch](https://blog.hubspot.com/marketing/online-community-launch)
85. User Role Management Guide for Marketplaces 2024 - Fleexy, accessed April 13, 2025, [https://fleexy.dev/blog/user-role-management-guide-for-marketplaces-2024/](https://fleexy.dev/blog/user-role-management-guide-for-marketplaces-2024/)
86. User Roles Permissions and Functions - Clarity Ventures, accessed April 13, 2025, [https://www.clarity-ventures.com/marketplace-ecommerce/user-roles-permissions-and-functions](https://www.clarity-ventures.com/marketplace-ecommerce/user-roles-permissions-and-functions)
87. Roles and permissions - Marketplace customer documentation | Microsoft Learn, accessed April 13, 2025, [https://learn.microsoft.com/en-us/marketplace/roles-permissions](https://learn.microsoft.com/en-us/marketplace/roles-permissions)
88. Marketplace User Roles - EzyCourse Help Center, accessed April 13, 2025, [https://help.ezycourse.com/article/marketplace-user-roles](https://help.ezycourse.com/article/marketplace-user-roles)
89. What Are User Roles — And Why Are They Key To Scaling Your Business? | Yext, accessed April 13, 2025, [https://www.yext.com/blog/2023/12/what-are-user-roles-and-why-are-they-key-to-scaling](https://www.yext.com/blog/2023/12/what-are-user-roles-and-why-are-they-key-to-scaling)
90. User Roles and Permissions - BigCommerce Help Center, accessed April 13, 2025, [https://support.bigcommerce.com/s/article/User-Permissions?language=en_US](https://support.bigcommerce.com/s/article/User-Permissions?language=en_US)
91. What is Role Based Access Control (RBAC) in Supply Chain? - Quloi, accessed April 13, 2025, [https://quloi.com/blog/why-your-supply-chain-needs-role-based-access-control/](https://quloi.com/blog/why-your-supply-chain-needs-role-based-access-control/)
92. Building UI/UX For Non-Tech-Savvy Users: Designing For Digital Literacy - Official Website Of Lightweight Solutions, accessed April 13, 2025, [https://lightweightsolutions.co/building-ui-ux-for-non-tech-savvy-users-designing-for-digital-literacy/](https://lightweightsolutions.co/building-ui-ux-for-non-tech-savvy-users-designing-for-digital-literacy/)
93. Accessibility for user experience designers - Digital.gov, accessed April 13, 2025, [https://digital.gov/guides/accessibility-for-teams/ux-design/](https://digital.gov/guides/accessibility-for-teams/ux-design/)
94. Five Traits of Low-literacy Technology Users in Developing Countires - ICTworks, accessed April 13, 2025, [https://www.ictworks.org/traits-low-literacy-technology-users/](https://www.ictworks.org/traits-low-literacy-technology-users/)
95. Designing for Low Literacy: Enhancing Accessibility and Understanding - YouTube, accessed April 13, 2025, [https://www.youtube.com/watch?v=F_sh_4VxGuc](https://www.youtube.com/watch?v=F_sh_4VxGuc)
96. User Interface Design for Low-literate and Novice Users: Past, Present and Future, accessed April 13, 2025, [https://courses.cs.washington.edu/courses/cse490c/18au/readings/medhi-thies-2015.pdf](https://courses.cs.washington.edu/courses/cse490c/18au/readings/medhi-thies-2015.pdf)
97. User Interface Design for Low-literate and Novice Users: Past, Present and Future - Now Publishers, accessed April 13, 2025, [https://www.nowpublishers.com/article/DownloadEBook/HCI-047](https://www.nowpublishers.com/article/DownloadEBook/HCI-047)
98. GPS Tracking - Fish & Amphibians - Utah Wildlife Migration Initiative, accessed April 13, 2025, [https://wildlifemigration.utah.gov/fish-and-amphibians/tracking/](https://wildlifemigration.utah.gov/fish-and-amphibians/tracking/)
99. How Do Fish Tracking Devices Work? - The GPS Store, accessed April 13, 2025, [https://www.thegpsstore.com/How-Do-Fish-Tracking-Devices-Work.aspx](https://www.thegpsstore.com/How-Do-Fish-Tracking-Devices-Work.aspx)
100. NEMO VMS - CLS Fisheries, accessed April 13, 2025, [https://fisheries.groupcls.com/product/nemo-vms-for-small-scale-fishers/](https://fisheries.groupcls.com/product/nemo-vms-for-small-scale-fishers/)
101. LAKE VICTORIA SMALL FISH PROJECT - KNOWLEDGE MANAGEMENT STRATEGY (2022-2025) October 2024, accessed April 13, 2025, [http://lvsfp.lvfo.org/wp-content/uploads/2025/02/3.-Knowledge-Management-Strategy-for-Lake-Victoria-Small-Fish-Project-WLVSFP-003.pdf](http://lvsfp.lvfo.org/wp-content/uploads/2025/02/3.-Knowledge-Management-Strategy-for-Lake-Victoria-Small-Fish-Project-WLVSFP-003.pdf)
102. Lake Victoria's Aquatic Resources Drive Sustainable Growth and Innovation in East Africa, accessed April 13, 2025, [https://www.digest.tz/lake-victorias-aquatic-resources-drive-sustainable-growth-and-innovation-in-east-africa/](https://www.digest.tz/lake-victorias-aquatic-resources-drive-sustainable-growth-and-innovation-in-east-africa/)
103. Darwin Initiative: Pairing Community Conservation Areas with Sustainable Aquaculture in Lake Victoria - Pathfinder International, accessed April 13, 2025, [https://www.pathfinder.org/projects/darwin-initiative/](https://www.pathfinder.org/projects/darwin-initiative/)
104. The fisheries of Lake Victoria, accessed April 13, 2025, [https://www.cbd.int/doc/nbsap/fisheries/Ogutu(summary).pdf](https://www.cbd.int/doc/nbsap/fisheries/Ogutu(summary).pdf)
105. Eco-Fishing - MIT Solve, accessed April 13, 2025, [https://solve.mit.edu/challenges/resilient-ecosystems/solutions/45812](https://solve.mit.edu/challenges/resilient-ecosystems/solutions/45812)
106. Sustainable fishery on Lake Victoria: exploitation, gears, fishing methods and management, accessed April 13, 2025, [https://www.fao.org/family-farming/detail/en/c/1620722/](https://www.fao.org/family-farming/detail/en/c/1620722/)
107. accessed January 1, 1970, [https://lvfo.org/wp-content/uploads/2020/07/Kenya-NPOA-Sustainable-Fisheries-Management-and-Development-2016.pdf](https://lvfo.org/wp-content/uploads/2020/07/Kenya-NPOA-Sustainable-Fisheries-Management-and-Development-2016.pdf)
108. accessed January 1, 1970, [https://www.gaalliance.org/advocate/rfid-technology-can-help-trace-farmed-fish/](https://www.gaalliance.org/advocate/rfid-technology-can-help-trace-farmed-fish/)
109. accessed January 1, 1970, [https://cointelegraph.com/explained/blockchain-in-seafood-traceability-explained](https://cointelegraph.com/explained/blockchain-in-seafood-traceability-explained)
110. Asset Tracking & Monitoring | RTLS | Link Labs, accessed April 13, 2025, [https://www.link-labs.com/asset-tracking](https://www.link-labs.com/asset-tracking)
111. (PDF) HOW PUBLIC EXPENDITURE TRACKING SYSTEMS ARE IMPROVING BUDGET IMPLEMENTATION AND ACCOUNTABILITY IN DEVELOPING COUNTRIES - ResearchGate, accessed April 13, 2025, [https://www.researchgate.net/publication/389896028_HOW_PUBLIC_EXPENDITURE_TRACKING_SYSTEMS_ARE_IMPROVING_BUDGET_IMPLEMENTATION_AND_ACCOUNTABILITY_IN_DEVELOPING_COUNTRIES](https://www.researchgate.net/publication/389896028_HOW_PUBLIC_EXPENDITURE_TRACKING_SYSTEMS_ARE_IMPROVING_BUDGET_IMPLEMENTATION_AND_ACCOUNTABILITY_IN_DEVELOPING_COUNTRIES)
112. Free Download the Top 10 best open source GPS Tracking software in 2025 - Fleet Stack, accessed April 13, 2025, [https://fleetstackglobal.com/article/free-Download-the-best-open-source-gps-tracking-software](https://fleetstackglobal.com/article/free-Download-the-best-open-source-gps-tracking-software)
113. Hyke: A Low-cost Remote Attendance Tracking System for Developing Regions - Microsoft, accessed April 13, 2025, [https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/nsdr011-reda-Hyke.pdf](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/nsdr011-reda-Hyke.pdf)
114. Blue Mission Tracking: Real-Time Location of UN Peacekeepers - Walter Dorn, accessed April 13, 2025, [https://www.walterdorn.net/220](https://www.walterdorn.net/220)
115. Maximum Power Point Tracking and solar power for developing countries around the world - ScholarWorks@UARK, accessed April 13, 2025, [https://scholarworks.uark.edu/eleguht/38/](https://scholarworks.uark.edu/eleguht/38/)
116. 5 Best Practices for Designing Cross-Platform UI/UX in 2024 - Codment, accessed April 13, 2025, [https://codment.com/5-best-practices-for-designing-cross-platform-ui-ux/](https://codment.com/5-best-practices-for-designing-cross-platform-ui-ux/)
117. Cross-Platform UX: Seamless User Journey Across Devices | ITeXchange Blog, accessed April 13, 2025, [https://www.itexchangeweb.com/blog/cross-platform-ux-seamless-user-journey-across-devices-2/](https://www.itexchangeweb.com/blog/cross-platform-ux-seamless-user-journey-across-devices-2/)
118. Exploring the Internet of Things in aquaculture: Challenges and future trends to consider, accessed April 13, 2025, [https://www.mispeces.com/en/in-depth/Exploring-the-Internet-of-Things-in-aquaculture-Challenges-and-future-trends-to-consider/](https://www.mispeces.com/en/in-depth/Exploring-the-Internet-of-Things-in-aquaculture-Challenges-and-future-trends-to-consider/)
119. Global IoT for Fisheries and Aquaculture Market Size, Share. - Spherical Insights, accessed April 13, 2025, [https://www.sphericalinsights.com/reports/iot-for-fisheries-and-aquaculture-market](https://www.sphericalinsights.com/reports/iot-for-fisheries-and-aquaculture-market)
120. Is IoT in aquaculture the answer to meeting food security and sustainability challenges? - Ignitec Bristol, accessed April 13, 2025, [https://www.ignitec.com/insights/is-iot-in-aquaculture-the-answer-to-meeting-food-security-and-sustainability-challenges/](https://www.ignitec.com/insights/is-iot-in-aquaculture-the-answer-to-meeting-food-security-and-sustainability-challenges/)
121. Internet of Things in aquaculture: A review of the challenges and potential solutions based on current and future trends | Knowledge for policy, accessed April 13, 2025, [https://knowledge4policy.ec.europa.eu/publication/internet-things-aquaculture-review-challenges-potential-solutions-based-current-future_en](https://knowledge4policy.ec.europa.eu/publication/internet-things-aquaculture-review-challenges-potential-solutions-based-current-future_en)
122. Internet of Things in aquaculture: A review of the challenges and potential solutions based on current and future trends - ResearchGate, accessed April 13, 2025, [https://www.researchgate.net/publication/367287176_Internet_of_Things_in_aquaculture_A_review_of_the_challenges_and_potential_solutions_based_on_current_and_future_trends](https://www.researchgate.net/publication/367287176_Internet_of_Things_in_aquaculture_A_review_of_the_challenges_and_potential_solutions_based_on_current_and_future_trends)
123. Internet of Things in aquaculture: A review of the challenges and potential solutions based on current and future trends, accessed April 13, 2025, [https://aquaculturemag.com/2023/04/05/internet-of-things-in-aquaculture-a-review-of-the-challenges-and-potential-solutions-based-on-current-and-future-trends/](https://aquaculturemag.com/2023/04/05/internet-of-things-in-aquaculture-a-review-of-the-challenges-and-potential-solutions-based-on-current-and-future-trends/)
124. Supply Chain Tracking - GPS Solutions - Digital Matter, accessed April 13, 2025, [https://www.digitalmatter.com/applications/supply-chain-tracking/](https://www.digitalmatter.com/applications/supply-chain-tracking/)
125. Smart Supply Chain & Logistics | Applications | LoRa - Semtech, accessed April 13, 2025, [https://www.semtech.com/lora/lora-applications/smart-supply-chain-logistics](https://www.semtech.com/lora/lora-applications/smart-supply-chain-logistics)
126. accessed January 1, 1970, [https://www.gsma.com/mobilefordevelopment/programme/connected-agriculture/cost-effective-traceability-solutions-agriculture-developing-countries/](https://www.gsma.com/mobilefordevelopment/programme/connected-agriculture/cost-effective-traceability-solutions-agriculture-developing-countries/)
127. Real Time Load Tracking - allGeo, accessed April 13, 2025, [https://www.allgeo.com/apps/real-time-load-tracking-and-monitoring](https://www.allgeo.com/apps/real-time-load-tracking-and-monitoring)
128. SensiWatch® Supply Chain Visibility & Tracking - Sensitech, accessed April 13, 2025, [https://www.sensitech.com/en/products/sensiwatch-platform/](https://www.sensitech.com/en/products/sensiwatch-platform/)
129. Mobile Inventory Management: Boost Efficiency with Real-Time Tracking, accessed April 13, 2025, [https://www.rfgen.com/blog/mobile-inventory-management/](https://www.rfgen.com/blog/mobile-inventory-management/)
130. How to Incentivize and Reward Participants in Market Research Online Communities, accessed April 13, 2025, [https://fuelcycle.com/blog/incentives-and-rewards-in-mrocs/](https://fuelcycle.com/blog/incentives-and-rewards-in-mrocs/)
131. Using Incentives in Market Research Online Communities, accessed April 13, 2025, [https://www.civicommrs.com/using-incentives-in-market-research-online-communities/](https://www.civicommrs.com/using-incentives-in-market-research-online-communities/)
132. Incentivizing Online Community Participation - Social Media Today, accessed April 13, 2025, [https://www.socialmediatoday.com/content/incentivizing-online-community-participation](https://www.socialmediatoday.com/content/incentivizing-online-community-participation)
133. Customer Incentives Examples, Benefits & FAQs | An Ultimate Guide - Incentivesmart, accessed April 13, 2025, [https://www.incentivesmart.com/blog/customer-incentives/](https://www.incentivesmart.com/blog/customer-incentives/)
134. accessed January 1, 1970, [https://www.salesforce.com/solutions/small-business/resources/build-online-community/](https://www.salesforce.com/solutions/small-business/resources/build-online-community/)
135. User Adoption Strategies: 7 Ways to Acquire and Retain More SaaS Customers | Woopra, accessed April 13, 2025, [https://www.woopra.com/blog/user-adoption-strategies](https://www.woopra.com/blog/user-adoption-strategies)
136. 14 Actionable User Adoption Strategies to Drive SaaS Business Growth - Userpilot, accessed April 13, 2025, [https://userpilot.com/blog/user-adoption-strategies/](https://userpilot.com/blog/user-adoption-strategies/)
137. 10 Steps for Creating an Effective SaaS User Adoption Strategy - Stonly, accessed April 13, 2025, [https://stonly.com/blog/saas-user-adoption-strategy/](https://stonly.com/blog/saas-user-adoption-strategy/)
138. Guidelines For Effective User Adoption Strategies | Insights - BT Business, accessed April 13, 2025, [https://business.bt.com/insights/effective-user-adoption-strategies/](https://business.bt.com/insights/effective-user-adoption-strategies/)
139. What Is Digital Adoption? 8 Strategies to Enable Users - Whatfix, accessed April 13, 2025, [https://whatfix.com/digital-adoption/](https://whatfix.com/digital-adoption/)
140. How To Drive Higher User Adoption Of Your Digital Platform - Forbes, accessed April 13, 2025, [https://www.forbes.com/councils/forbesbusinesscouncil/2023/05/22/how-to-drive-higher-user-adoption-of-your-digital-platform/](https://www.forbes.com/councils/forbesbusinesscouncil/2023/05/22/how-to-drive-higher-user-adoption-of-your-digital-platform/)
141. How to Implement a Successful Digital Adoption Strategy - Blog Usetiful, accessed April 13, 2025, [https://blog.usetiful.com/2021/10/digital-adoption-how-to-implement.html](https://blog.usetiful.com/2021/10/digital-adoption-how-to-implement.html)
142. accessed January 1, 1970, [https://www.linkedin.com/pulse/user-adoption-strategies-digital-marketplaces-nidhi-singhal](https://www.linkedin.com/pulse/user-adoption-strategies-digital-marketplaces-nidhi-singhal)
143. The Impact of Incentives on Data Collection for Online Surveys: Social Media Recruitment Study, accessed April 13, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11258516/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11258516/)
144. Pay, Pat, and Clawback: Incentivizing Service Providers' Participation in On-Demand Digital Platforms | Management Science - PubsOnLine, accessed April 13, 2025, [https://pubsonline.informs.org/doi/10.1287/mnsc.2023.02603](https://pubsonline.informs.org/doi/10.1287/mnsc.2023.02603)
145. Participation incentives: What they are and how to use them in marketing - Tremendous, accessed April 13, 2025, [https://www.tremendous.com/blog/participation-incentives/](https://www.tremendous.com/blog/participation-incentives/)
146. How to Incentivize Survey Responses for Improved Participation, accessed April 13, 2025, [https://www.civicommrs.com/how-to-incentivize-survey-responses-for-improved-participation/](https://www.civicommrs.com/how-to-incentivize-survey-responses-for-improved-participation/)
147. This Date in Baseball - Jackie Robinson becomes the 1st black player to sign a Major League contract - AP News, accessed April 13, 2025, [https://apnews.com/211aca34932618d6b2c1dbbb61e69d0f](https://apnews.com/211aca34932618d6b2c1dbbb61e69d0f)
148. The Effect of Incentives on Facilitating User Engagement with Succulent Retailers' Social Media Pages - MDPI, accessed April 13, 2025, [https://www.mdpi.com/2311-7524/9/8/849](https://www.mdpi.com/2311-7524/9/8/849)
149. INVESTMENT INCENTIVES IN TWO-SIDED PLATFORMS∗ 1. Introduction While proprietary and open source software have coexisted since - Northwestern Pritzker School of Law, accessed April 13, 2025, [https://www.law.northwestern.edu/research-faculty/clbe/workingpapers/documents/CASADESUS-MASANEL-Lllanes_Investment_Incentives.pdf](https://www.law.northwestern.edu/research-faculty/clbe/workingpapers/documents/CASADESUS-MASANEL-Lllanes_Investment_Incentives.pdf)
150. The Configuration of Incentives in Small and Medium-Sized Content Platform Enterprises Under the Normalization of COVID-19, accessed April 13, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9099008/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9099008/)
151. Steering Incentives of Platforms: Evidence from the Telecommunications Industry - National Bureau of Economic Research, accessed April 13, 2025, [https://www.nber.org/system/files/working_papers/w27083/w27083.pdf](https://www.nber.org/system/files/working_papers/w27083/w27083.pdf)
152. Exploring the Effect of Monetary Incentives on User Behavior in Online Sharing Platforms, accessed April 13, 2025, [https://scholarspace.manoa.hawaii.edu/items/eb982c1c-a6b4-4d63-ab2a-9381a8e9b4b8](https://scholarspace.manoa.hawaii.edu/items/eb982c1c-a6b4-4d63-ab2a-9381a8e9b4b8)
153. accessed January 1, 1970, [https://www.dynamicsquare.co.uk/blog/economic-incentives-for-online-marketplace/](https://www.dynamicsquare.co.uk/blog/economic-incentives-for-online-marketplace/)
154. Mastering User Experience: Best Practices for Intuitive Interfaces - AmorServ, accessed April 13, 2025, [https://www.amorserv.com/insights/mastering-user-experience-best-practices-for-intuitive-interfaces](https://www.amorserv.com/insights/mastering-user-experience-best-practices-for-intuitive-interfaces)
155. The Intuitive Interface | User Experience Office - Princeton University, accessed April 13, 2025, [https://ux.princeton.edu/learn-ux/blog/intuitive-interface](https://ux.princeton.edu/learn-ux/blog/intuitive-interface)
156. Achieving cross-platform UI/UX design consistency in digital product strategy, accessed April 13, 2025, [https://www.stan.vision/journal/achieving-cross-platform-ui-ux-design-consistency-in-digital-product-strategy](https://www.stan.vision/journal/achieving-cross-platform-ui-ux-design-consistency-in-digital-product-strategy)
157. Mobile App Design in 2025: Best Practices and Examples - Imaginovation, accessed April 13, 2025, [https://imaginovation.net/blog/mobile-app-design-best-practices/](https://imaginovation.net/blog/mobile-app-design-best-practices/)
158. Designing for inclusivity and diversity in user interfaces | MoldStud, accessed April 13, 2025, [https://moldstud.com/articles/p-designing-for-inclusivity-and-diversity-in-user-interfaces](https://moldstud.com/articles/p-designing-for-inclusivity-and-diversity-in-user-interfaces)
159. Inclusive UX Design: 5 Ways to Foster Diversity in UX and Digital Products - Chykalophia, accessed April 13, 2025, [https://chykalophia.com/inclusive-ux-design-chykalophia/](https://chykalophia.com/inclusive-ux-design-chykalophia/)
160. What is Universal Design? | IxDF - The Interaction Design Foundation, accessed April 13, 2025, [https://www.interaction-design.org/literature/topics/universal-design](https://www.interaction-design.org/literature/topics/universal-design)
161. Designing User Experiences For All – Culturally Responsive Computing - Remixing Open Textbooks through an Equity Lens (ROTEL), accessed April 13, 2025, [https://rotel.pressbooks.pub/culturally-responsive-computing/chapter/designing-user-experiences-for-all/](https://rotel.pressbooks.pub/culturally-responsive-computing/chapter/designing-user-experiences-for-all/)
162. How to Implement Inclusivity into Your UX/UI Design - COBE, accessed April 13, 2025, [https://www.cobeisfresh.com/blog/how-to-implement-inclusivity-into-your-ux-ui-design](https://www.cobeisfresh.com/blog/how-to-implement-inclusivity-into-your-ux-ui-design)
163. A Quick Guide for Inclusive Web Design Best Practices - Recite Me, accessed April 13, 2025, [https://reciteme.com/us/news/inclusive-web-design/](https://reciteme.com/us/news/inclusive-web-design/)
164. How To Design Websites For Diverse Audience - BAM Studio, accessed April 13, 2025, [https://bamstudio.com.au/blog/how-to-design-websites-for-diverse-audience](https://bamstudio.com.au/blog/how-to-design-websites-for-diverse-audience)
165. Accessibility Principles | Web Accessibility Initiative (WAI) | W3C, accessed April 13, 2025, [https://www.w3.org/WAI/fundamentals/accessibility-principles/](https://www.w3.org/WAI/fundamentals/accessibility-principles/)
166. Strategically Organize a Website for Diverse Audiences - One Eighty Digital, accessed April 13, 2025, [https://oneeighty.digital/2025/03/12/strategically-organize-a-website/](https://oneeighty.digital/2025/03/12/strategically-organize-a-website/)
167. 8 Best Practices for Designing Infographics for Diversity and Inclusion - Venngage, accessed April 13, 2025, [https://venngage.com/blog/designing-for-diversity/](https://venngage.com/blog/designing-for-diversity/)
168. 6 Best Practices for Creating an All-Inclusive Website Experience - Liventus, accessed April 13, 2025, [https://www.liventus.com/creating-inclusive-website-experience/](https://www.liventus.com/creating-inclusive-website-experience/)
169. Designing for Cultural Diversity: Creating Global-Friendly Websites - SITE123, accessed April 13, 2025, [https://www.site123.com/learn/designing-for-cultural-diversity-creating-global-friendly-websites](https://www.site123.com/learn/designing-for-cultural-diversity-creating-global-friendly-websites)
170. accessed January 1, 1970, [https://www.toptal.com/mobile/mobile-app-design-for-developing-countries](https://www.toptal.com/mobile/mobile-app-design-for-developing-countries)
171. Mobile App Design in 2025: Best Practices & Top Tools - EitBiz, accessed April 13, 2025, [https://www.eitbiz.com/blog/mobile-app-design-best-practices-and-tools/](https://www.eitbiz.com/blog/mobile-app-design-best-practices-and-tools/)
172. 15 Mobile App Design Best Practices - ThoughtSpot, accessed April 13, 2025, [https://www.thoughtspot.com/data-trends/best-practices/mobile-app-design-best-practices](https://www.thoughtspot.com/data-trends/best-practices/mobile-app-design-best-practices)
173. Mobile App UX Design: 16 must-know best practices - Glassbox, accessed April 13, 2025, [https://www.glassbox.com/blog/mobile-app-ux-design-best-practices/](https://www.glassbox.com/blog/mobile-app-ux-design-best-practices/)
174. The ultimate guide to mobile app design: Follow these UI principles & best practices, accessed April 13, 2025, [https://www.uxdesigninstitute.com/blog/ultimate-guide-to-mobile-app-design/](https://www.uxdesigninstitute.com/blog/ultimate-guide-to-mobile-app-design/)
175. The Dos And Don'ts Of Mobile App Design: A Comprehensive Guide - Reddit, accessed April 13, 2025, [https://www.reddit.com/r/userinterface/comments/11mkozm/the_dos_and_donts_of_mobile_app_design_a/](https://www.reddit.com/r/userinterface/comments/11mkozm/the_dos_and_donts_of_mobile_app_design_a/)
176. Best Supply Chain Management Software: 10 Tools For 2025 - Infomineo, accessed April 13, 2025, [https://infomineo.com/blog/best-supply-chain-management-software-10-tools-for-2025/](https://infomineo.com/blog/best-supply-chain-management-software-10-tools-for-2025/)
177. Best Supply Chain Visibility Software of 2025 - Descartes MacroPoint, accessed April 13, 2025, [https://macropoint.com/news/best-supply-chain-visibility-software-2025/](https://macropoint.com/news/best-supply-chain-visibility-software-2025/)
178. 15 Best Supply Chain Management Software Solutions in 2025 - 10XSheets, accessed April 13, 2025, [https://www.10xsheets.com/blog/scm-supply-chain-management-software](https://www.10xsheets.com/blog/scm-supply-chain-management-software)
179. Best Supply Chain Management Software: 10 Tools For 2025 - Podium, accessed April 13, 2025, [https://www.podium.com/article/supply-chain-management-software/](https://www.podium.com/article/supply-chain-management-software/)
180. Top 10 Supply Chain Business Network Platforms In 2024 - ElevatIQ, accessed April 13, 2025, [https://www.elevatiq.com/post/top-supply-chain-business-network-platforms/](https://www.elevatiq.com/post/top-supply-chain-business-network-platforms/)
181. 50+ Logistics Management Software Examples - Wise Systems, accessed April 13, 2025, [https://www.wisesystems.com/blog/logistics-management-software-examples/](https://www.wisesystems.com/blog/logistics-management-software-examples/)
182. Types of Supply Chain Management Software: An In-Depth Guide, accessed April 13, 2025, [https://www.wgu.edu/blog/types-supply-chain-management-software-depth-guide2307.html](https://www.wgu.edu/blog/types-supply-chain-management-software-depth-guide2307.html)
183. accessed January 1, 1970, [https://www.capterra.com/blog/207/5-supply-chain-management-software-user-experience-tips/](https://www.capterra.com/blog/207/5-supply-chain-management-software-user-experience-tips/)
184. Any strategies for conducting usability tests with low-literacy technology users? - Reddit, accessed April 13, 2025, [https://www.reddit.com/r/UXDesign/comments/11g3co0/any_strategies_for_conducting_usability_tests/](https://www.reddit.com/r/UXDesign/comments/11g3co0/any_strategies_for_conducting_usability_tests/)