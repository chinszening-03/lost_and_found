package com.example.lostfound.lostfound.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lostfound.lostfound.model.Item;
import com.example.lostfound.lostfound.repository.ItemRepository;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Get all items
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Create a new item
    @PostMapping
    public Item createItem(@RequestBody Item item) {

        item.setStatus("OPEN");

        return itemRepository.save(item);
    }
}
