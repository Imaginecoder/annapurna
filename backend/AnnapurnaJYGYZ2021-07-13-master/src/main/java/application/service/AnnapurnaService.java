/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package application.service;

import application.client.AnnapurnaClientDB;
import application.model.Actor;
import application.model.ActorType;
import application.model.Product;
import application.model.Storage;
import com.cloudant.client.api.model.Response;
import java.io.Serializable;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 *
 * @author Constantin DRABO <panda dot constantin at gmail dot com>
 * @since 17 juil. 2021
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AnnapurnaService implements Serializable {

    private final AnnapurnaClientDB annapurnaClientDBService;

    public Response doCreateActor(final Actor actor) {
        return annapurnaClientDBService.createActor(actor);
    }

    public List<Actor> doGetActorsList() {
        return annapurnaClientDBService.getActors();
    }

    public Response doCreateActortype(final ActorType actorType) {
        return annapurnaClientDBService.createActorType(actorType);
    }

    public List<ActorType> doGetActorTypesList() {
        return annapurnaClientDBService.getActorTypes();
    }

    public Response doUpdateActor(final String id, final Actor actorPayload) {
        return annapurnaClientDBService.updateActor(id, actorPayload);
    }

    public Response doDeleteActor(final String id) {
        return annapurnaClientDBService.deleteActor(id);
    }

    public Response doCreateProduct(final Product product) {
        return annapurnaClientDBService.createProduct(product);
    }

    public List<Product> doGetProductsList() {
        return annapurnaClientDBService.getProducts();
    }

    public Response doUpdateProduct(final String id , final Product productpPayload) {
        return annapurnaClientDBService.updateProduct(id, productpPayload);
    }

    public Response doDeleteProduct(final String id) {
        return annapurnaClientDBService.deleteProduct(id);
    }

     public Response doCreateStorage(final Storage storage) {
        return annapurnaClientDBService.createStorage(storage);
    }

    public List<Storage> doGetStoragesList() {
        return annapurnaClientDBService.getStorages();
    }

    public Response doUpdateStorage(final String id , final Storage storagePayload) {
        return annapurnaClientDBService.updateStorage(id, storagePayload);
    }

    public Response doDeleteStorage(final String id) {
        return annapurnaClientDBService.deleteStorage(id);
    }

}
