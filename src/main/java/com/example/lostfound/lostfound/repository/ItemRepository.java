package com.example.lostfound.lostfound.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lostfound.lostfound.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{
    
}
