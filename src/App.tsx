import "./App.scss";
import mobileImg from "../public/images/bg-header-mobile.svg";
import desktopImg from "../public/images/bg-header-desktop.svg";
import data from "./data.json";
import { useState } from "react";

function App() {
  const [filters, setFilter] = useState<string[]>([]);

  const addFilter = (filtervalue: string) => {
    if (filters.includes(filtervalue)) return;
    setFilter((currentFilter) => {
      return [...currentFilter, filtervalue];
    });
  };

  const delFilter = (delValue: string) => {
    setFilter((currentFilter) =>
      currentFilter.filter((value) => value !== delValue)
    );
  };

  return (
    <>
      <main>
        <picture aria-hidden="true">
          <source srcSet={desktopImg} media="(min-width: 64rem)" />
          <img className="bg__img" src={mobileImg} alt="BG Image" />
        </picture>
        <section className={filters.length !== 0 ? "main" : "main filter"}>
          <h1 className="sr-only">Job Listing Page</h1>
          {filters.length !== 0 ? (
            <div className="filter">
              <div className="filter__buttons">
                {filters.map((filterValue, index) => {
                  return (
                    <div className="filter__chip" key={index}>
                      <span className="filter__chip-text">{filterValue}</span>
                      <button
                        onClick={() => delFilter(filterValue)}
                        className="filter__chip-close"
                      ></button>
                    </div>
                  );
                })}
              </div>
              <button className="filter__clear" onClick={() => setFilter([])}>
                Clear
              </button>
            </div>
          ) : null}
          {filters.length !== 0 ? (
            <ul className="list">
              {data
                .filter((item) =>
                  filters.every((filter) =>
                    [
                      item.role,
                      item.level,
                      ...item.languages,
                      ...item.tools,
                    ].includes(filter)
                  )
                )
                .map((filteredItem) => {
                  return (
                    <li
                      key={filteredItem.id}
                      className={
                        filteredItem.featured
                          ? "list__item featured"
                          : "list__item"
                      }
                    >
                      <img
                        className="list__img"
                        src={filteredItem.logo}
                        alt={filteredItem.company}
                      />
                      <section className="list__item-content">
                        <article>
                          <div className="item-content__details">
                            <div className="details__row details__first-row">
                              <h2>{filteredItem.company}</h2>
                              <div>
                                {filteredItem.new ? (
                                  <small className="new">NEW!</small>
                                ) : null}
                                {filteredItem.featured ? (
                                  <small className="featured">FEATURED</small>
                                ) : null}
                              </div>
                            </div>
                            <h3 className="details__row details__second-row">
                              {filteredItem.position}
                            </h3>
                            <ul className="details__row details__last-row">
                              <li>{filteredItem.postedAt}</li>
                              <li>{filteredItem.contract}</li>
                              <li>{filteredItem.location}</li>
                            </ul>
                          </div>
                          <ul className="item-content-filters">
                            <li onClick={() => addFilter(filteredItem.role)}>
                              {filteredItem.role}
                            </li>
                            <li onClick={() => addFilter(filteredItem.level)}>
                              {filteredItem.level}
                            </li>
                            {filteredItem.languages.map((language, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => addFilter(language)}
                                >
                                  {language}
                                </li>
                              );
                            })}
                            {filteredItem.tools.map((tool, index) => {
                              return (
                                <li key={index} onClick={() => addFilter(tool)}>
                                  {tool}
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      </section>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <ul className="list">
              {data.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={
                      item.featured ? "list__item featured" : "list__item"
                    }
                  >
                    <img
                      className="list__img"
                      src={item.logo}
                      alt={item.company}
                    />
                    <section className="list__item-content">
                      <article>
                        <div className="item-content__details">
                          <div className="details__row details__first-row">
                            <h2>{item.company}</h2>
                            <div>
                              {item.new ? (
                                <small className="new">NEW!</small>
                              ) : null}
                              {item.featured ? (
                                <small className="featured">FEATURED</small>
                              ) : null}
                            </div>
                          </div>
                          <h3 className="details__row details__second-row">
                            {item.position}
                          </h3>
                          <ul className="details__row details__last-row">
                            <li>{item.postedAt}</li>
                            <li>{item.contract}</li>
                            <li>{item.location}</li>
                          </ul>
                        </div>
                        <ul className="item-content-filters">
                          <li onClick={() => addFilter(item.role)}>
                            {item.role}
                          </li>
                          <li onClick={() => addFilter(item.level)}>
                            {item.level}
                          </li>
                          {item.languages.map((language, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() => addFilter(language)}
                              >
                                {language}
                              </li>
                            );
                          })}
                          {item.tools.map((tool, index) => {
                            return (
                              <li key={index} onClick={() => addFilter(tool)}>
                                {tool}
                              </li>
                            );
                          })}
                        </ul>
                      </article>
                    </section>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
