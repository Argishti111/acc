create table "employees"(
                            id serial primary key ,
                            first_name varchar(500),
                            last_name varchar(500),
                            ssn varchar(10),
                            passport varchar(15),
                            address text,
                            inserted_date timestamp default now()
);

create table companies(
                          id serial primary key,
                          name varchar(500),
                          hvhh varchar(15),
                          address text,
                          inserted_date timestamp default now(),
                          active bool default true
);

create table employees_companies(
                                    id serial primary key ,
                                    employee_id int references employees,
                                    company_id int references companies,
                                    hire_date date,
                                    fire_date date,
                                    working_hours smallint,
                                    inserted_date timestamp default now()
);

create function add_employee(_first_name varchar, _last_name varchar, _ssn varchar, _passport varchar,
                             _address text, out employee_id int
)
    returns int
    language plpgsql
as
$$
begin

    employee_id = (select id from employees
                   where
                           first_name = trim(lower(_first_name)) and
                           last_name = trim(lower(_last_name)) and
                           ssn = trim(lower(_ssn)) and
                           passport = trim(lower(_passport)) and
                           address = trim(lower(_address))
    );

    if employee_id is null
    then
        insert into employees(first_name, last_name, ssn, passport, address)
        values (_first_name, _last_name, _ssn, _passport, _address)
        returning id into employee_id;
    end if;
end;
$$;

create function add_company(_name varchar, _address text, _hvhh varchar, out company_id int)
    returns int
    language plpgsql
as
$$
begin


    company_id = (select id from companies
                  where name = _name and address = _address and hvhh = _hvhh);

    if company_id is null
    then
        insert into companies(name, address, hvhh)
        values (_name, _address, _hvhh)
        returning id into company_id;
    end if;

end;
$$;

create function add_employee_to_company(_employee_id int, _company_id int, _hire_date date,_working_hours smallint, out success bool)
    returns bool
    language plpgsql
as
$$
begin
    if not exists(select 1 from employees_companies where employee_id = _employee_id and company_id = _company_id)
    then
        insert into employees_companies(employee_id, company_id, hire_date, fire_date, working_hours)
        values(_employee_id, _company_id, _hire_date, null, _working_hours);

        success = true;
    else
        success = false;
    end if;

end;
$$;

create function get_employees(_company_id int, _ssn varchar)
    returns table(id int, first_name varchar, last_name varchar, ssn varchar, passport varchar, address varchar, hire_date date, fire_date date, working_hours int)
    language plpgsql
as
$$
begin
    return query
        select e.id, e.first_name, e.last_name, e.ssn, e.passport, e.address, ec.hire_date, ec.fire_date, ec.working_hours
        from employees e
                 join employees_companies ec on e.id = ec.employee_id
        where ec.company_id = _company_id and (e.ssn = _ssn or ssn is null);
end;
$$


