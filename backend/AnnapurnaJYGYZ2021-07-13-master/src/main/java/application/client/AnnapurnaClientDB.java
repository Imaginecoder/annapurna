/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package application.client;

import application.model.Actor;
import application.model.ActorType;
import application.model.Product;
import application.model.Production;
import application.model.Storage;
import com.cloudant.client.api.model.Response;
import java.util.List;

/**
 * Interface pour la gestion des
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 */
public interface AnnapurnaClientDB {
    /**
     * Create a new actor.
     * @param actor
     * @return Actor an actor such as farmer, restaurant, etc.
     */
    Response createActor(Actor actor);
    /**
     * Retrieve the list of actors.
     * @return List<Actor>
     */
    List<Actor> getActors();
    /**
     * Modify an actor information.
     * @param id
     * @param actorPayload
     * @return
     */
    Response updateActor(String id, Actor actorPayload);
    /**
     * Delete an actor by specifying the id.
     * @param id
     * @return
     */
    Response deleteActor(String id);
    /**
     * Create a new actor type.
     * @param actorType
     * @return
     */
    Response createActorType(ActorType actorType);
    /**
     * Retrieve the list of actor types.
     * @return
     */
    List<ActorType> getActorTypes();
    /**
     * Create a product.
     * @param product
     * @return
     */
    Response createProduct(Product product);
    /**
     * Update a product.
     * @param id
     * @param productPayload
     * @return
     */
    Response updateProduct(String id, Product productPayload);
    /**
     * Delete a product.
     * @param id
     * @return
     */
    Response deleteProduct(String id);
    /**
     * Retrieve the list of the products.
     * @return
     */
    List<Product> getProducts();
    /**
     * Create a storage.
     * @param storage
     * @return
     */
    Response createStorage(Storage storage);
    /**
     * Update a storage.
     * @param id
     * @param storagePayload
     * @return
     */
    Response updateStorage(String id, Storage storagePayload);
    /**
     * Delete a storage.
     * @param id
     * @return
     */
    Response deleteStorage(String id);
    /**
     * Get the list of storage.
     * @return
     */
    List<Storage> getStorages();
    /**
     * Create a production.
     * @param production
     * @return
     */
    Response createProductionInfos(Production production);
    /**
     * Update a new production.
     * @param id
     * @return
     */
    Response updateProduction(String id);
    /**
     * Get the list of productions based on a specific product.
     * @param productId
     * @return
     */
    List<Production> getProductionByProduct(String productId);
    /**
     * get the list of productions based on a specific producer.
     * @param producerId
     * @return
     */
    List<Production> getProductionByProducer(String producerId);
    /**
     * Get the list of productioons based on a specifi product and a producer.
     * @param productId
     * @param producerId
     * @return
     */
    List<Production> getProductionByProducerAndProduct(String productId, String producerId);

}
