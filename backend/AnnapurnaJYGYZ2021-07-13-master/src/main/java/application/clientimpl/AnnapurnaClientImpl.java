/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package application.clientimpl;

import application.client.AnnapurnaClientDB;
import application.model.Actor;
import application.model.ActorType;
import application.model.Product;
import application.model.Production;
import application.model.Storage;
import com.cloudant.client.api.Database;
import com.cloudant.client.api.model.Response;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

/**
 * Class for implementing the service for Annapurna application.
 *
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 * @since 17 juil. 2021
 * @version 1.0
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AnnapurnaClientImpl implements AnnapurnaClientDB {

    private final Database annapurnaDatabase;

    /**
     * Create a new actor.
     *
     * @param actor
     * @return
     */
    @Override
    public Response createActor(Actor actor) {
        if (actor != null) {
            return annapurnaDatabase.post(actor);
        } else {
            return null;
        }
    }

    /**
     * Retrieve the list of actors.
     *
     * @return List<Actor>s
     */
    @Override
    public List<Actor> getActors() {
        try {
            return annapurnaDatabase.getAllDocsRequestBuilder()
                    .includeDocs(true).build().getResponse().getDocsAs(Actor.class);
        } catch (IOException ex) {
            return null;
        }
    }

    /**
     * Create a new actor type.
     *
     * @param actorType
     * @return
     */
    @Override
    public Response createActorType(ActorType actorType) {
        if (actorType != null) {
            return annapurnaDatabase.post(actorType);
        } else {
            return null;
        }
    }

    @Override
    public List<ActorType> getActorTypes() {
        try {
            return annapurnaDatabase.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(ActorType.class);
        } catch (IOException ex) {
            return null;
        }
    }

    @Override
    public Response updateActor(final String id, final Actor actorPayload) {
        Actor actorFound = annapurnaDatabase.find(Actor.class, id);
        if (actorFound != null) {
            actorFound.setActorID(actorPayload.getActorID());
            actorFound.setAddress(actorPayload.getAddress());
            actorFound.setCity(actorPayload.getCity());
            actorFound.setCountry(actorPayload.getCountry());
            actorFound.setFullName(actorPayload.getFullName());
            actorFound.setPhoneNumber(actorPayload.getPhoneNumber());
            actorFound.setProducer(actorPayload.isProducer());
            actorFound.setActorType(actorPayload.getActorType());
            return annapurnaDatabase.update(actorFound);
        } else {
            return null;
        }
    }

    /**
     * Delete an actor.
     *
     * @param id
     * @return
     */
    @Override
    public Response deleteActor(final String id) {
        Actor actorFound = annapurnaDatabase.find(Actor.class, id);
        if (actorFound != null) {
            return annapurnaDatabase.remove(actorFound);
        } else {
            return new Response();
        }
    }

    @Override
    public Response createProduct(final Product product) {
        if (product != null) {
            return annapurnaDatabase.post(product);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product payload is mandatory");
        }
    }

    @Override
    public Response updateProduct(final String id, final Product productPayload) {
        Product productFound = annapurnaDatabase.find(Product.class, id);
        if (productFound != null) {
            productFound.setProductID(productPayload.getProductID());
            productFound.setType(productPayload.getType());
            productFound.setName(productPayload.getName());
            productFound.setDescription(productPayload.getDescription());
            productFound.setImage(productPayload.getImage());
            return annapurnaDatabase.update(productFound);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with the ID: " + id + " not found");
        }
    }

    @Override
    public Response deleteProduct(String id) {
        if (id != null) {
            Product productFound = annapurnaDatabase.find(Product.class, id);
            if (productFound != null) {
                annapurnaDatabase.remove(productFound);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with the ID: " + id + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ID is mandatory");
        }
        return null;
    }

    @Override
    public List<Product> getProducts() {
        try {
            return annapurnaDatabase.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(Product.class);
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No product created");
        }
    }

    @Override
    public Response createStorage(final Storage storage) {
        if (storage != null) {
            return annapurnaDatabase.post(storage);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No product created");
        }
    }

    @Override
    public Response updateStorage(final String id, final Storage storagePayload) {
        if (id != null) {
            Storage storageFound = annapurnaDatabase.find(Storage.class, id);
            if (storageFound != null) {
                storageFound.setStorageLocation(storagePayload.getStorageLocation());
                storageFound.setProducerCode(storagePayload.getProducerCode());
                storageFound.setAddress(storagePayload.getAddress());
                return annapurnaDatabase.update(storageFound);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Storage with " + id + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ID is mandatory");
        }
    }

    @Override
    public Response deleteStorage(final String id) {
        if (id != null) {
            Storage storageFound = annapurnaDatabase.find(Storage.class, id);
            if (storageFound != null) {
                return annapurnaDatabase.remove(storageFound);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Storage with " + id + " not found");
            }

        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ID is mandatory");
        }
    }

    @Override
    public List<Storage> getStorages() {
        try {
            return annapurnaDatabase.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(Storage.class);
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No storage found");
        }
    }

    @Override
    public Response createProductionInfos(final Production production) {
        if (production != null) {
            return annapurnaDatabase.post(production);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No production to be added");
        }
    }

    @Override
    public Response updateProduction(final String id) {
        if (id != null) {
            Production productionFound = annapurnaDatabase.find(Production.class, id);
            if (productionFound != null) {
                return annapurnaDatabase.update(productionFound);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Production with " + id + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ID is mandatory");
        }
    }

    @Override
    public List<Production> getProductionByProduct(String productId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Production> getProductionByProducer(String producerId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Production> getProductionByProducerAndProduct(String productId, String producerId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
