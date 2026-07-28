package com.bugtracker.dto;

import com.bugtracker.enums.Priority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CreateBugDTO {

    private String title;
    private String description;
    private Priority priority;
    private Long createdById;
}